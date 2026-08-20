/*
This needs to be added to Google Apps Scripts and deployed as a webapp

```js
const folderID = "xxxxxxxx"

// only return data on a POST request

function doPost() {
  return (function(){
    const folder = DriveApp.getFolderById(folderID);
    const files = folder.getFiles();
    const fileBlobs = [];
    while (files.hasNext())  {
      let file = files.next();
      let filename = file.getName();
      if (!!filename.endsWith(".md") || !!filename.endsWith(".mdx")) {
        if ((!!filename.startsWith("article.") && !!file.getBlob().getDataAsString().includes('progress: growth'))) {
          Logger.log(`including ${file}`);
          fileBlobs.push({name: filename, blob: file.getBlob().getBytes()})
        } else {
          Logger.log(`skipping ${file}`);
        }
      } else {
        Logger.log(`skipping ${file}`);
      }
    }

Logger.log(fileBlobs);
    return ContentService
          .createTextOutput(JSON.stringify({
            result: fileBlobs,
            name: "all-files.json",
            mimeType: "json"
          }))
          .setMimeType(ContentService.MimeType.JSON);
  })();
}


Deploy this script and use the Web App Url, e.g. `https://script.google.com/macros/s/{BIG_ID}/exec`
```
*/
import type { Loader, LoaderContext } from "astro/loaders";

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 2_000;

interface DraftResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: { name: string; blob: any }[];
}

async function fetchWithRetry(
  url: string,
  logger: LoaderContext["logger"],
): Promise<DraftResponse> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const response = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
    });

    const contentType = response.headers.get("content-type") ?? "";
    if (!response.ok || !contentType.includes("application/json")) {
      const body = await response.text().catch(() => "<unreadable>");
      const preview = body.slice(0, 200);
      logger.warn(
        `draft fetch attempt ${attempt}/${MAX_RETRIES} — ` +
          `status ${response.status}, content-type: ${contentType}` +
          `\n${preview}`,
      );
      if (attempt < MAX_RETRIES) {
        const delay = BASE_DELAY_MS * 2 ** (attempt - 1);
        logger.info(`retrying in ${delay}ms…`);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
    }

    return response.json();
  }
  throw new Error("draft fetch failed after retries");
}

export function sourceDraftArticles(cache): Loader {
  if (!import.meta.env.ARTICLE_FETCH_ENDPOINT)
    throw new Error("env var ARTICLE_FETCH_ENDPOINT is not set");
  const url = import.meta.env.ARTICLE_FETCH_ENDPOINT;

  return {
    name: "draft-content-loader",
    load: async ({
      store,
      logger,
      renderMarkdown,
      meta,
      generateDigest,
    }: LoaderContext) => {
      console.time(`fetch all draft article content`);
      const json = await fetchWithRetry(url, logger);
      console.timeEnd(`fetch all draft article content`);

      for (const item of json.result) {
        store.set({
          id: item.name,
          data: item.blob,
          rendered: await renderMarkdown(item.blob.toString()),
        });
      }
    },
  };
}
