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

  try {
    // hoist api so we can use in scope outside of this block
    var api = await new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
    });
  } catch (e) {
    // airtable uses `assert` which doesn't exit the process
    console.warn("\nAPI key is required to connect to Airtable");
    return;
  }

  console.time(`\nfetch all Airtable rows from ${tables.length} tables`);

  let queue = [];
  tables.forEach((tableOptions) => {
    let base = api.base(tableOptions.baseId);

    let table = base(tableOptions.tableName);

    let view = tableOptions.tableView || "";

    let query = table.select({
      view: view,
    });

    // query.all() returns a promise, pass an array for each table with
    // both our promise and the queryName and then map reduce at the
    // final promise resolution to get queryName onto each row
    queue.push(Promise.all([query.all(), tableOptions.queryName]));
  });

  // queue has array of promises and when resolved becomes nested arrays
  // we flatten the array to return all rows from all tables after mapping
  // the queryName to each row
  return Promise.all(queue)
    .then(async (all) => {
      const reduced = all.reduce((nested, query) => {
        const rows = query[0];
        const queryName = query[1];
        nested[queryName] = rows.map((record) => record.fields);
        return nested;
      }, {});

      try {
        await fs.rm(filePath);
      } catch (e) {
        // noop
      }
      await fs.mkdir(contentPath, { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(reduced));

      console.timeEnd(`\nfetch all Airtable rows from ${tables.length} tables`);
      return reduced;
    })
    .catch((e) => {
      throw e;
      return;
    });
};
