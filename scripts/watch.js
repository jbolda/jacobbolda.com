import {
  main,
  spawn,
  ensure,
  throwOnErrorEvent,
  once,
  on,
  createChannel,
} from "effection";
import chokidar from "chokidar";
import { exec, daemon } from "@effection/process";

main(function* start() {
  yield runWatchedCommand("css", "npm run build:css:watch");
  yield runWatchedCommand("public dir", "serve -u --no-port-switching public");
  yield fileWatcher();
  yield;
});

function runWatchedCommand(label, command, expectText, expectError) {
  return {
    *init() {
      console.time(`watching ${label}`);
      const child = yield daemon(command, {
        env: { ...process.env },
      });

      yield spawn(
        child.stdout.forEach(function* (data) {
          console.log(data.toString());
        })
      );
      yield spawn(
        child.stderr.forEach(function* (data) {
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

function fileWatcher() {
  return {
    *init() {
      console.time("started file watching");
      let watcher = chokidar.watch(".", {
        ignored: ["node_modules", ".tmp", "public", ".git"],
        ignoreInitial: true,
      });
      yield ensure(() => watcher.close());
      yield spawn(throwOnErrorEvent(watcher));
      yield once(watcher, "ready");

      // console.log(watcher.getWatched());
      console.timeEnd("started file watching");

      yield runBuild();
      let fileChanges = createChannel();
      let writeOperation = function* (file) {
        fileChanges.send();
        console.debug(`${file} changed, rebuilding`);
      };
      yield spawn(on(watcher, "add").forEach(writeOperation));
      yield spawn(on(watcher, "unlink").forEach(writeOperation));
      yield spawn(on(watcher, "change").forEach(writeOperation));
      return yield fileChanges.forEach(function* () {
        yield runBuild();
      });
    },
  };
}
