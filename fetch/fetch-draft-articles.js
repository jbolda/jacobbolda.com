/*
This needs to be added to Google Apps Scripts and deployed as a webapp

```js
const folderID = "[FILL_IN_YOUR_FOLDER_ID_HERE]"

function doPost(e) {
  return (function(){
    const folder = DriveApp.getFolderById(folderID);
    const files = folder.getFilesByType("text/markdown");
    const fileBlobs = [];
    while (files.hasNext())  {
      let file = files.next();
      // note we are only pulling things that begin with article
      if (file.getName().startsWith("article.")) {
        fileBlobs.push({name: file.getName(), blob: file.getBlob().getBytes()})
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

export const sourceDraftArticles = async () => {
  await fs.mkdir("./content/drafts/", { recursive: true });

  const url =
    "https://script.google.com/macros/s/AKfycbwPzjEshwhPdf08j56sbEkz7kICKyUBT3fw_dE6AfDsIL-BP-qz_u6kzA/exec?id=boop";

  const response = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    follow: 20,
  });
  const json = await response.json();

  return Promise.all(
    json.result.map((result) =>
      fs.writeFile(`./content/drafts/${result.name}`, Buffer.from(result.blob))
    )
  );
};
