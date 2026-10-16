import { existsSync, readdirSync, readFileSync } from "fs";
import { join, resolve } from "path";
import { execFileSync } from "child_process";
import { parse } from "@bomb.sh/args";
import yaml from "js-yaml";

const CONTENT_API_URL = process.env.CONTENT_API_URL || "https://content-api.jbolda.workers.dev";
const DRAFTS_TOKEN = process.env.DRAFTS_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || "jbolda/jacobbolda.com";
// KV writes can take up to ~60s to propagate to other regions; the CI build
// fetches from a different PoP than this script's PUT, so wait before dispatch
const PROPAGATION_WAIT_MS = 60_000;
const VAULT_NOTES_FOLDER = "brain";
// only draft-state notes leave the vault (same rule as the old Apps Script);
// widen to include "seed" if early-stage notes should publish too
const DRAFT_PROGRESS = "growth";

const flags = parse(process.argv.slice(2), {
  boolean: ["skip-dispatch"],
  string: ["wait"],
  default: { "skip-dispatch": false, wait: "60" },
});
const vaultPathArg = Array.isArray(flags._) ? (flags._[0] as string) : (flags._ as string);
const VAULT_NOTES_DIR = join(resolve(vaultPathArg ?? process.cwd()), VAULT_NOTES_FOLDER);

if (!DRAFTS_TOKEN) {
  console.error("❌ Set DRAFTS_TOKEN (the worker's write secret)");
  process.exit(1);
}
if (!vaultPathArg) {
  console.error("Usage: node scripts/sync-drafts.ts <vault-path>");
  process.exit(1);
}

function collectFiles(dir: string, acc: string[] = []): string[] {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) collectFiles(fullPath, acc);
    else acc.push(fullPath);
  }
  return acc;
}

function parseFrontmatter(content: string): Record<string, unknown> {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(content);
  if (!match) return {};
  try {
    return (yaml.load(match[1]) as Record<string, unknown>) ?? {};
  } catch {
    return {};
  }
}

interface NoteDraft {
  name: string;
  content: string;
}

function collectDrafts(): NoteDraft[] {
  const drafts: NoteDraft[] = [];
  for (const file of collectFiles(VAULT_NOTES_DIR)) {
    if (!/\.(md|mdx)$/i.test(file)) continue;
    const content = readFileSync(file, "utf-8");
    const frontmatter = parseFrontmatter(content);

    if (frontmatter.progress !== DRAFT_PROGRESS) continue;

    const slug = typeof frontmatter.slug === "string" ? frontmatter.slug.trim() : "";
    if (!slug) {
      console.warn(`⚠ skipping ${file}: no slug frontmatter property`);
      continue;
    }
    if (!/^[a-z0-9.-]+$/i.test(slug)) {
      console.warn(`⚠ skipping ${file}: slug "${slug}" must be kebab-case (a-z, 0-9, dots, dashes)`);
      continue;
    }

    drafts.push({ name: slug.toLowerCase(), content });
  }
  return drafts;
}

async function api(path: string, method: string, body?: string) {
  const response = await fetch(`${CONTENT_API_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${DRAFTS_TOKEN}`,
      ...(body ? { "Content-Type": "text/plain" } : {}),
    },
    ...(body ? { body } : {}),
  });
  if (!response.ok) {
    throw new Error(`${method} ${path} failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function main() {
  const local = collectDrafts();

  const remote = (await api("/drafts", "GET")) as { name: string }[];
  const remoteNames = new Set(remote.map((d) => d.name));
  const localNames = new Set(local.map((d) => d.name));

  for (const draft of local) {
    await api(`/drafts/${draft.name}`, "PUT", draft.content);
    console.log(`✓ put ${draft.name}`);
  }

  let removedOrphans = 0;
  for (const name of remoteNames) {
    if (!localNames.has(name)) {
      await api(`/drafts/${name}`, "DELETE");
      removedOrphans++;
      console.log(`✓ deleted ${name}`);
    }
  }

  console.log(`\nSynced ${local.length} draft(s), removed ${removedOrphans} orphan(s)`);

  if (flags["skip-dispatch"]) {
    console.log("Skipping rebuild dispatch (--skip-dispatch)");
    return;
  }

  console.log(`Waiting ${Number(flags.wait) / 1000}s for KV propagation before dispatching...`);
  await new Promise((resolveWait) => setTimeout(resolveWait, Number(flags.wait)));

  execFileSync(
    "gh",
    ["api", `repos/${GITHUB_REPO}/dispatches`, "-f", "event_type=draft-update"],
    { stdio: "inherit" },
  );
  console.log("✓ Dispatched draft-update — production rebuild triggered");
}

main().catch((error) => {
  console.error("❌ Sync failed:", error.message);
  process.exit(1);
});
