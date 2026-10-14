import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 2_000;
const root = path.dirname(fileURLToPath(import.meta.url));
const draftsDirectory = path.resolve(root, "../src/content/articles/drafts");

interface DraftItem {
  name: string;
  blob: unknown;
}

interface DraftResponse {
  result?: DraftItem[];
}

async function fetchDrafts(url: string): Promise<DraftResponse> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const response = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
    });

    const contentType = response.headers.get("content-type") ?? "";
    if (response.ok && contentType.includes("application/json")) {
      return response.json();
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

function blobToText(blob: unknown): string {
  if (typeof blob === "string") return blob;
  if (Array.isArray(blob))
    return Buffer.from(blob as number[]).toString("utf8");
  return blob == null ? "" : String(blob);
}

export async function syncDraftArticles(
  url = process.env.ARTICLE_FETCH_ENDPOINT,
): Promise<void> {
  await rm(draftsDirectory, { recursive: true, force: true });

  if (!url) {
    console.warn("ARTICLE_FETCH_ENDPOINT not set, skipping draft articles");
    return;
  }

  const json = await fetchDrafts(url);
  await mkdir(draftsDirectory, { recursive: true });

  for (const item of json.result ?? []) {
    const filename = path.basename(String(item.name));
    if (
      !filename.startsWith("article.") ||
      (!filename.endsWith(".md") && !filename.endsWith(".mdx"))
    ) {
      continue;
    }

    await writeFile(
      path.join(draftsDirectory, filename),
      blobToText(item.blob),
      "utf8",
    );
  }
}
