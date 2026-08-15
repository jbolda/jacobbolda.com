import { copyFileSync, existsSync, mkdirSync, mkdtempSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { parse } from "@bomb.sh/args";
import { all, ensure, exit, main } from "effection";
import { useServiceTestRig } from "@simulacrum/server";

import { diffRoutes, summarize, writeHtmlReport, writeMarkdownReport } from "./checks.ts";
import type { ReportMeta } from "./checks.ts";
import { collectFingerprints } from "./fingerprint.ts";
import { capture, removeWorktree, resolveBaseRef, routesFromDist, run } from "./infrastructure.ts";
import { startServer } from "./static-server.ts";
import { serviceGraph } from "../simulators/service-graph.ts";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function usage() {
  console.log(`
usage: node scripts/compare-upgrade.ts [options]

Compares the current working tree against a base ref by rendering both
builds in a real browser and diffing the *meaning* of each page
(text, links, images, computed styles, color contrast, layout overflow).

No screenshots or baselines are stored; a fresh report is produced per run.

options:
  --base <ref>      ref to treat as "before" (default: origin/production)
  --out <dir>       report output dir (default: <repo>/.tmp/compare)
  --old-dist <dir>  use an existing built dist as "before" (skips git+build)
  --new-dist <dir>  use an existing built dist as "after" (skips build)
  --keep            keep the temporary worktree and servers on exit
  --strict          exit non-zero when any medium-severity finding exists
  --help            show this message

When AIRTABLE_API_KEY is not set in the environment, both builds are run
against the local simulator graph (simulators/service-graph.ts) so the check
works without real credentials. Set AIRTABLE_API_KEY (and optionally
AIRTABLE_ENDPOINT_URL, ARTICLE_FETCH_ENDPOINT) to use the real services
instead.
`);
}

function parseArgs(argv: string[]) {
  const flags = parse(argv, {
    boolean: ["keep", "strict", "help"],
    string: ["base", "out", "old-dist", "new-dist", "oldDist", "newDist"],
    alias: { "old-dist": "oldDist", "new-dist": "newDist" },
    default: {
      base: "origin/production",
      out: path.join(root, ".tmp", "compare"),
      keep: false,
      strict: false,
      help: false,
    },
  });

  return {
    base: flags.base,
    out: path.resolve(flags.out),
    oldDist: flags.oldDist ? path.resolve(flags.oldDist) : null,
    newDist: flags.newDist ? path.resolve(flags.newDist) : null,
    keep: flags.keep,
    strict: flags.strict,
    help: flags.help,
  };
}

await main(function* (args) {
  const parsed = parseArgs(args);
  if (parsed.help) {
    usage();
    yield* exit(0);
  }
  mkdirSync(parsed.out, { recursive: true });

  if (!existsSync(path.join(root, "node_modules"))) {
    yield* exit(2, "node_modules missing — run `npm ci` first.");
  }

  const base = parsed.oldDist
    ? parsed.base
    : yield* resolveBaseRef(parsed.base, root);

  const beforeSha = parsed.oldDist
    ? "existing-dist"
    : yield* capture("git", ["rev-parse", base], root);
  const afterSha = parsed.newDist
    ? "existing-dist"
    : yield* capture("git", ["rev-parse", "HEAD"], root);

  let worktree: string | null = null;

  if (!process.env.AIRTABLE_API_KEY) {
    console.log(
      "[sim] AIRTABLE_API_KEY not set — running both builds against the local simulator graph",
    );
    const rig = yield* useServiceTestRig(serviceGraph)();
    const airtablePort = rig.graph.status.get("airtable")?.port;
    const draftsPort = rig.graph.status.get("drafts")?.port;
    if (!airtablePort || !draftsPort)
      throw new Error(
        `simulator graph started without service ports (airtable=${airtablePort}, drafts=${draftsPort})`,
      );
    process.env.AIRTABLE_API_KEY = "simulated";
    process.env.AIRTABLE_ENDPOINT_URL = `http://127.0.0.1:${airtablePort}`;
    process.env.ARTICLE_FETCH_ENDPOINT = `http://127.0.0.1:${draftsPort}/drafts`;
  }

  let oldDist = parsed.oldDist;
  if (!oldDist) {
    worktree = mkdtempSync(path.join(os.tmpdir(), "upgrade-compare-"));
    yield* ensure(() => {
      if (worktree && !parsed.keep) {
        return removeWorktree(root, worktree);
      }
    });
    console.log(`[1/6] checking out ${base} into ${worktree}`);
    yield* run("git", ["worktree", "add", "--detach", worktree, base], root);
    const envLocal = path.join(root, ".env.local");
    if (existsSync(envLocal)) copyFileSync(envLocal, path.join(worktree, ".env.local"));
    console.log(`[2/6] building before (${base})…`);
    yield* run("npm", ["ci"], worktree);
    yield* run("npm", ["run", "build"], worktree);
    oldDist = path.join(worktree, "dist");
  } else {
    console.log(`[1/6] using existing before dist: ${parsed.oldDist}`);
  }

  let newDist = parsed.newDist;
  if (!newDist) {
    console.log("[2/6] building after (current working tree)…");
    yield* run("npm", ["run", "build"], root);
    newDist = path.join(root, "dist");
  } else {
    console.log(`[2/6] using existing after dist: ${parsed.newDist}`);
  }

  const oldRoutes = routesFromDist(oldDist);
  const newRoutes = routesFromDist(newDist);
  const allRoutes = [...new Set([...oldRoutes, ...newRoutes])].sort();
  console.log(
    `[3/6] routes: before=${oldRoutes.length} after=${newRoutes.length} compared=${allRoutes.length}`,
  );

  const oldServer = yield* startServer(oldDist);
  const newServer = yield* startServer(newDist);
  console.log(`[4/6] serving before on ${oldServer.url}, after on ${newServer.url}`);

  const shotsDir = path.join(parsed.out, "screenshots");
  mkdirSync(path.join(shotsDir, "old"), { recursive: true });
  mkdirSync(path.join(shotsDir, "new"), { recursive: true });

  console.log("[5/6] fingerprinting pages in real browser…");
  const [oldFp, newFp] = yield* all([
    collectFingerprints({
      baseUrl: oldServer.url,
      routes: allRoutes,
      screenshotsDir: path.join(shotsDir, "old"),
    }),
    collectFingerprints({
      baseUrl: newServer.url,
      routes: allRoutes,
      screenshotsDir: path.join(shotsDir, "new"),
    }),
  ]);

  console.log("[6/6] diffing…");
  const { findings, added, removed } = diffRoutes(allRoutes, oldFp, newFp, oldRoutes, newRoutes);
  const summary = summarize(findings, allRoutes.length, added, removed);

  const meta: ReportMeta = {
    before: parsed.oldDist ? parsed.oldDist : parsed.base,
    beforeSha,
    after: parsed.newDist ? parsed.newDist : "working-tree",
    afterSha,
  };

  writeMarkdownReport({
    outFile: path.join(parsed.out, "report.md"),
    meta,
    summary,
    findings,
  });
  writeHtmlReport({
    outFile: path.join(parsed.out, "report.html"),
    meta,
    summary,
    findings,
  });

  console.log("");
  console.log(`Report written to ${parsed.out}/report.md and ${parsed.out}/report.html`);
  console.log(
    `Summary: ${summary.total} pages, ${summary.changedRoutes} changed, ` +
      `${summary.added} added, ${summary.removed} removed — ` +
      `${summary.high} high, ${summary.medium} medium, ${summary.info} info`,
  );
  if (summary.high === 0 && (summary.medium === 0 || !parsed.strict)) {
    console.log("Result: nothing broken (no high-severity findings).");
  } else {
    console.log("Result: potential regressions found — review the report.");
    yield* exit(1);
  }
});
