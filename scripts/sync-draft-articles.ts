import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 2_000;
const root = path.dirname(fileURLToPath(import.meta.url));
const draftsDirectory = path.resolve(root, "../src/content/articles/drafts");

interface DraftItem {
  name: string;
  content: string;
}

async function fetchDrafts(url: string): Promise<DraftItem[]> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const response = await fetch(url, { redirect: "follow" });

    const contentType = response.headers.get("content-type") ?? "";
    if (response.ok && contentType.includes("application/json")) {
      return (await response.json()) as DraftItem[];
    }

    const body = await response.text().catch(() => "<unreadable>");
    console.warn(
      `draft fetch attempt ${attempt}/${MAX_RETRIES} — ` +
        `status ${response.status}, content-type: ${contentType}\n${body.slice(0, 200)}`,
    );
    if (attempt < MAX_RETRIES) {
      await new Promise((resolve) =>
        setTimeout(resolve, BASE_DELAY_MS * 2 ** (attempt - 1)),
      );
    }
  }

  throw new Error("draft fetch failed after retries");
}

export async function syncDraftArticles(
  url = process.env.CONTENT_API_URL
    ? `${process.env.CONTENT_API_URL}/drafts`
    : undefined,
): Promise<void> {
  await rm(draftsDirectory, { recursive: true, force: true });

  if (!url) {
    console.warn("CONTENT_API_URL not set, skipping draft articles");
    return;
  }

  const drafts = await fetchDrafts(url);
  await mkdir(draftsDirectory, { recursive: true });

  for (const item of drafts) {
    const name = path.basename(item.name);
    const filename =
      name.endsWith(".md") || name.endsWith(".mdx") ? name : `${name}.md`;

    await writeFile(path.join(draftsDirectory, filename), item.content, "utf8");
  }
}
