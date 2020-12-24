#!/usr/bin/env node
import {install, printStats} from 'esinstall'

// esinstall doesn't let us quiet the output while it runs
// so we kinda do that here.
const logger = {
  debug() {},
  warn(...args) {
    console.warn(...args)
  },
  error(...args) {
    console.error(...args)
  }
}

async function main() {
  const {success, stats} = await install(['preact', 'react-helmet'], {
    dest: './public/web_modules',
    logger
  })
  if (success) {
    console.log(stats)
  }
}

main()
