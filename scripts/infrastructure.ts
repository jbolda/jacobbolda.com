import { readdirSync } from "node:fs";
import path from "node:path";

import { Stdio, exec } from "@effectionx/process";
import { scoped } from "effection";
import type { Operation } from "effection";

export function run(command: string, args: string[], cwd: string): Operation<void> {
  return (function* () {
    yield* exec(command, { cwd, arguments: args }).expect();
  })();
}

export function capture(command: string, args: string[], cwd: string): Operation<string> {
  return (function* () {
    const result = yield* scoped(function* () {
      yield* Stdio.around({
        *stdout() {},
        *stderr() {},
      });
      return yield* exec(command, { cwd, arguments: args }).expect();
    });
    return result.stdout.trim();
  })();
}

export function resolveBaseRef(base: string, root: string): Operation<string> {
  return (function* () {
    if (base === "HEAD" || base.includes("/") || /^[0-9a-f]{7,40}$/i.test(base)) {
      return base;
    }
    try {
      yield* capture("git", ["rev-parse", "--verify", base], root);
      return base;
    } catch {
      return `origin/${base}`;
    }
  })();
}

export function removeWorktree(root: string, worktree: string): Operation<void> {
  return (function* () {
    try {
      yield* run("git", ["worktree", "remove", "--force", worktree], root);
    } catch (error) {
      console.error(
        `cleanup: failed to remove worktree ${worktree}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  })();
}

export function routesFromDist(distDir: string): string[] {
  const routes = new Set(["/"]);
  const walk = (dir: string, prefix: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full, path.posix.join(prefix, entry.name));
      } else if (entry.isFile() && entry.name.endsWith(".html")) {
        const route =
          entry.name === "index.html"
            ? prefix
            : path.posix.join(prefix, entry.name.replace(/\.html$/, ""));
        routes.add(route);
      }
    }
  };
  walk(distDir, "/");
  return [...routes].sort();
}
