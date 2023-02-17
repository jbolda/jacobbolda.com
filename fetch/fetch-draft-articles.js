/*
This needs to be added to Google Apps Scripts and deployed as a webapp

```js
const folderID = "xxxxxxxx"

function doPost() {
  return (function(){
    const rootFolder = DriveApp.getFolderById(folderID);
    const folders = rootFolder.getFolders();
    const fileBlobs = [];

    while (folders.hasNext()) {
      let folder = folders.next();
      let folderName = folder.getName();
      // only process certain folders
      if (!folderName.startsWith('brain')) continue;
      Logger.log(`processing ${folderName}`);
      const files = folder.getFiles();
      while (files.hasNext())  {
        let file = files.next();
        let filename = file.getName();
        if (!!filename.endsWith(".md") || !!filename.endsWith(".mdx")) {
          try {
            let fileBlob = file.getBlob();
            let fileString = fileBlob.getDataAsString();
            if (!fileString.startsWith('---')) {
              Logger.log(`skipping ${file}, no frontmatter`);
              continue;
            }
            let frontmatterSplit = fileString.split('---\n');
            let frontmatterString = frontmatterSplit[1];
            let frontmatter = YAML.eval(frontmatterString);
            if (frontmatter?.slug && frontmatter?.title && frontmatter?.written) {
              Logger.log(`including ${file}`);
              fileBlobs.push({name: filename, blob: fileBlob.getBytes()})
            }
          } catch (error) {
          Logger.log(`skipping ${file}, error: ${error.message}`);
          }
        } else {
          Logger.log(`skipping ${file}`);
        }
      }
    }

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

import fetch from "node-fetch";
import { promises as fs } from "fs";
import { convertFromYamlToMeta } from "../.bin/frontmatter-to-meta.js";

export const sourceDraftArticles = async () => {
  const contentPath = "./content/drafts/";

  if (process.env.SITE_FILE_CACHE) {
    console.info("trying to use draft articles from cache");
    try {
      const files = await fs.readdir(contentPath);
      // it exists, let's skip downloading
      if (files.length > 0) return;
    } catch (err) {
      console.error("error pulling draft articles from cache");
      console.error(err);
    }
  }

  try {
    await fs.rm(contentPath, { recursive: true });
  } catch (e) {
    // noop
  }
  await fs.mkdir(contentPath, { recursive: true });

  if (!process.env.ARTICLE_FETCH_ENDPOINT)
    throw new Error("env var ARTICLE_FETCH_ENDPOINT is not set");
  const url = process.env.ARTICLE_FETCH_ENDPOINT;
  console.time(`fetch all draft article content`);
  const response = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
    follow: 20,
  });
  const json = await response.json();
  console.timeEnd(`fetch all draft article content`);

  return Promise.all(
    json.result.map(async (result) => {
      let filename = result.name.split(".");
      let fileBuffer = Buffer.from(result.blob);
      filename.pop();
      filename.push(["mdx"]);
      fs.writeFile(
        `./content/drafts/${filename.join(".")}`,
        await convertFromYamlToMeta({ content: fileBuffer })
      );
    })
  );
};
