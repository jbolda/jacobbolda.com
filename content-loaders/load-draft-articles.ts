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
      const response = await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      });
      const json = await response.json();
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
