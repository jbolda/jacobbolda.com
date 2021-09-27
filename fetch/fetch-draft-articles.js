/*
This needs to be added to Google Apps Scripts and deployed as a webapp

```js
const folderID = "[FILL_IN_YOUR_FOLDER_ID_HERE]"

function doPost(e) {
  return (function(){
    const folder = DriveApp.getFolderById(folderID);
    // sometimes files are not marked with the correct mimetype?
    // I had to switch to `.getFiles()` and check the file string ended with .md/.mdx
    const files = folder.getFilesByType("text/markdown");
    const fileBlobs = [];
    while (files.hasNext())  {
      let file = files.next();
      let filename = file.getName();
      // note we are only pulling things that begin with article
      // or `if (!!filename.startsWith("article.") && (!!filename.endsWith(".md") || !!filename.endsWith(".mdx"))) {`
      // see note earlier comment, needed if using `getFiles()`
      if (filename.startsWith("article.")) {
        fileBlobs.push({name: filename, blob: file.getBlob().getBytes()})
      }
    }
    return ContentService
          .createTextOutput(JSON.stringify({
            result: fileBlobs,
            name: "all-files.json",
            mimeType: "json"
          }))
          .setMimeType(ContentService.MimeType.JSON);
  })(e.parameters.id);
}
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

  console.time(`fetch all draft article content`);
  const url =
    "https://script.google.com/macros/s/AKfycbxw2HBOQrO4WlnRsUBSbdu1qbnytdGBuNuxSTg3_69DE-7S6KKPzsmLHga8tTjGaATCpw/exec?id=boop";
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
