import Airtable, { type FieldSet, type Table } from "airtable";
import type { Loader, LoaderContext } from "astro/loaders";
import GithubSlugger from "github-slugger";

const slugger = new GithubSlugger();

type AirtableBase = {
  baseId: string;
  tableView?: string;
  tableName: string;
  queryName: string;
};

const fetchAirtable = async (
  tables: AirtableBase[]
): Promise<Record<string, FieldSet[]>> => {
  if (!import.meta.env.AIRTABLE_API_KEY)
    throw new Error("env var AIRTABLE_API_KEY not set");

  const basesKey = tables.map((t) => t.tableName).join(",");
  console.time(`fetch all ${basesKey} content`);
  Airtable.configure({ apiKey: import.meta.env.AIRTABLE_API_KEY });

  const tableQueries = tables.map(async (tableOptions) => {
    let allRecords: FieldSet[] = [];
    const { baseId, tableView, tableName, queryName } = tableOptions;
    let base = Airtable.base(baseId);
    let view = tableView || "";

    await base(tableName)
      .select({ view })
      .eachPage((records, fetchNextPage) => {
        allRecords.push(
          ...records.map((record) => ({ ...record.fields, id: record.id }))
        );
        fetchNextPage();
      })
      .catch((error) => console.error(error));

    return [queryName, allRecords];
  });

  // queue has array of promises and when resolved becomes nested arrays
  // we flatten the array to return all rows from all tables after mapping
  // the queryName to each row
  const results: Record<string, FieldSet[]> = await Promise.all(
    tableQueries
  ).then(async (all) => {
    return all.reduce((nested, tuple) => {
      nested[tuple[0] as string] = tuple[1] as FieldSet[];
      return nested;
    }, {});
  });
  console.timeEnd(`fetch all ${basesKey} content`);
  return results;
};

export function sourceAirtable({
  bases,
  slugField,
}: {
  bases: AirtableBase[];
  slugField?: string;
}): Loader {
  return {
    name: "airtable-loader",
    load: async ({
      store,
      logger,
      parseData,
      renderMarkdown,
      meta,
      generateDigest,
    }: LoaderContext) => {
      try {
        const response = await fetchAirtable(bases);

        for (const [tableName, fieldSet] of Object.entries(response)) {
          for (const item of fieldSet) {
            try {
              const id = item.id as string;
              const slug = slugField
                ? slugger.slug(item[slugField] as string)
                : undefined;
              const data = await parseData({
                id,
                data: { ...item, slug },
              });
              const digest = generateDigest(data);
              store.set({
                id,
                data,
                digest,
              });
            } catch (error) {
              console.dir(item);
              logger.error(error);
            }
          }
        }
      } catch (error) {
        logger.error(error);
      }
    },
  };
}
