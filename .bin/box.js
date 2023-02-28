#!/usr/bin/env node
import { install, printStats } from "esinstall";

const specs = [
  "preact",
  "preact/hooks",
  "@mdx-js/preact",
  "react-helmet",
  "preact/compat",
  "preact/jsx-runtime",
  "big.js",
];

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

const options = {
  dest: "./public/web_modules",
  alias: {
    react: "preact/compat",
  },
  logger,
};

async function main() {
  const { success, stats } = await install(specs, options);

  console.log(stats);
}

try {
  main();
} catch (e) {
  throw e;
}
