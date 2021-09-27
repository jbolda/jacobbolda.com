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
import { exec } from "@effection/process";

function* runBuild() {
  console.log("building...");
  console.time("run build command");
  const child = yield exec("toast incremental .", {
    env: { ...process.env, SITE_FILE_CACHE: "true" },
  });

  yield child.stdout.forEach((data) => {
    process.stdout.write(data);
  });
  yield child.stderr.forEach((data) => {
    process.stderr.write(data);
  });
  console.timeEnd("run build command");
}

main(function* start() {
  console.time("started file watching");
  let watcher = chokidar.watch(".", {
    ignored: "{node_modules,.tmp,public}",
    ignoreInitial: true,
  });

  yield ensure(() => watcher.close());
  yield spawn(throwOnErrorEvent(watcher));

  yield once(watcher, "ready");
  console.timeEnd("started file watching");
  yield runBuild();

  let fileChanges = createChannel();

  let writeOperation = () =>
    function* () {
      fileChanges.send();
      console.debug("files changed, rebuilding");
    };

  yield spawn(on(watcher, "add").forEach(writeOperation));
  yield spawn(on(watcher, "unlink").forEach(writeOperation));
  yield spawn(on(watcher, "change").forEach(writeOperation));

  yield fileChanges.forEach(() => runBuild());
});
