import {
  main,
  spawn,
  sleep,
  ensure,
  throwOnErrorEvent,
  once,
  on,
  createChannel,
} from "effection";
import chokidar from "chokidar";
import { exec, daemon } from "@effection/process";

main(function* start() {
  yield runWatchedCommand("css", "npm run build:css:watch", "tailwindcss");
  yield runWatchedCommand(
    "public",
    "serve -n -u --no-port-switching public",
    undefined,
    "connections"
  );
  yield fileWatcher();
});

function runWatchedCommand(label, command, expectText, expectError) {
  return {
    *init() {
      console.time(`watching ${label}`);
      const child = yield daemon(command, {
        env: { ...process.env },
      });

      yield spawn(
        child.stdout.forEach((data) => {
          console.log(data.toString());
        })
      );
      yield spawn(
        child.stderr.forEach((data) => {
          console.error(data.toString());
        })
      );
      if (expectText)
        yield child.stdout
          .filter((chunk) => chunk.includes(expectText))
          .expect();
      if (expectError)
        yield child.stderr
          .filter((chunk) => chunk.includes(expectError))
          .expect();
      console.timeEnd(`watching ${label}`);

      return child;
    },
  };
}

function* tickingBomb(message) {
  yield sleep(5000);
  throw new Error(message);
}

function* runBuild() {
  console.log("building...");
  console.time("run build command");
  const child = yield exec("toast incremental .", {
    env: { ...process.env, SITE_FILE_CACHE: "true" },
  });

  yield spawn(
    child.stdout.forEach((data) => {
      console.log(data.toString());
    })
  );
  yield spawn(
    child.stderr.forEach((data) => {
      console.error(data.toString());
    })
  );
  yield child.join();
  console.timeEnd("run build command");
}

function* fileWatcher() {
  console.time("started file watching");
  let watcher = chokidar.watch(".", {
    ignored: ["node_modules", ".tmp", "public"],
    ignoreInitial: true,
  });

  yield ensure(() => watcher.close());
  yield spawn(throwOnErrorEvent(watcher));

  yield once(watcher, "ready");
  console.timeEnd("started file watching");

  yield runBuild();

  let fileChanges = createChannel();
  let writeOperation = (file) =>
    function* () {
      fileChanges.send();
      console.debug(`${file} changed, rebuilding`);
    };

  yield spawn(on(watcher, "add").forEach(writeOperation));
  yield spawn(on(watcher, "unlink").forEach(writeOperation));
  yield spawn(on(watcher, "change").forEach(writeOperation));

  yield fileChanges.forEach(() => runBuild());
}
