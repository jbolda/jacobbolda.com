import Airtable, { type FieldSet } from "airtable";
import path from "path";
import { promises as fs } from "fs";

export const sourceAirtable = async (
  contentDir: string,
  tables: Record<string, any>[],
  template: null | ((f: object, contentPath: string) => Promise<void>) = null,
  cache: boolean = false
) => {
  const contentPath = `./src/content/${contentDir}`;
  const filePath = path.join(contentPath, `${tables[0].baseId}.json`);

  if (process.env.SITE_FILE_CACHE || cache) {
    console.info("trying to use airtable from cache");
    try {
      // it exists, let's skip downloading
      const cacheFile = await fs.readFile(filePath, "utf-8");
      return { ...JSON.parse(cacheFile), cache: true };
    } catch (err) {
      console.error("error pulling airtable from cache");
      console.error(err);
    }
  }

  if (!process.env.AIRTABLE_API_KEY)
    throw new Error("env var AIRTABLE_API_KEY not set");

  Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });

  const tableQueries = tables.map(async (tableOptions) => {
    let allRecords: FieldSet[] = [];
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
      if (template) {
        await template(reduced, contentPath);
      } else {
        await fs.writeFile(filePath, JSON.stringify(reduced));
      }

      return reduced;
    })
    .catch((e) => {
      throw e;
    });
};
