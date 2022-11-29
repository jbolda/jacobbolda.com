import Airtable from "airtable";
import path from "path";
import { promises as fs } from "fs";

export const sourceAirtable = async ({ tables }) => {
  const contentPath = "./.tmp/airtable/";
  const filePath = path.join(contentPath, `${tables[0].baseId}.json`);

  if (process.env.SITE_FILE_CACHE) {
    console.info("trying to use airtable from cache");
    try {
      // it exists, let's skip downloading
      const cacheFile = await fs.readFile(filePath);
      return JSON.parse(cacheFile);
    } catch (err) {
      console.error("error pulling airtable from cache");
      console.error(err);
    }
  }

  if (!process.env.AIRTABLE_API_KEY)
    throw new Error("env var AIRTABLE_API_KEY not set");

  // const api = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });
  Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });

  console.time(`fetch all Airtable rows from ${tables.length} tables`);

  let queue = [];
  const tableQueries = tables.map(async (tableOptions) => {
    let allRecords = [];
    const { baseId, tableView, tableName, queryName } = tableOptions;
    let base = Airtable.base(baseId);
    let view = tableView || "";

    await base(tableName)
      .select({ view })
      .eachPage((records, fetchNextPage) => {
        allRecords.push(...records.map((record) => record.fields));
        fetchNextPage();
      })
      .catch((error) => console.error(error));

    return [queryName, allRecords];
  });

  // queue has array of promises and when resolved becomes nested arrays
  // we flatten the array to return all rows from all tables after mapping
  // the queryName to each row
  return Promise.all(tableQueries)
    .then(async (all) => {
      const reduced = all.reduce((nested, tuple) => {
        nested[tuple[0]] = tuple[1];
        return nested;
      }, {});

      try {
        await fs.rm(filePath);
      } catch (e) {
        // noop
      }
      await fs.mkdir(contentPath, { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(reduced));

      console.timeEnd(`fetch all Airtable rows from ${tables.length} tables`);
      return reduced;
    })
    .catch((e) => {
      throw e;
    });
};
