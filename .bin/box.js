#!/usr/bin/env node
import { install, printStats } from "esinstall";

const specs = [
  "preact",
  "preact/hooks",
  "@mdx-js/preact",
  "react-helmet",
  "preact/compat",
];

const options = {
  alias: {
    react: "preact/compat",
  },
};

// esinstall doesn't let us quiet the output while it runs
// so we kinda do that here.
const logger = {
  debug() {},
  warn(...args) {
    console.warn(...args);
  },
  error(...args) {
    console.error(...args);
  },
};

async function main() {
  const { success, stats } = await install(specs, {
    dest: "./public/web_modules",
    logger,
    ...options,
  });
  console.log(stats);
}

try {
  main();
} catch (e) {
  throw e;
}
