import type { Loader, LoaderContext } from "astro/loaders";

export function sourceContentApi({
  endpoint,
  idField,
}: {
  endpoint: string;
  idField: string;
}): Loader {
  return {
    name: "content-api-loader",
    load: async ({ store, parseData, generateDigest }: LoaderContext) => {
      const response = await fetch(endpoint);
      if (!response.ok)
        throw new Error(
          `content-api fetch failed: ${response.status} ${response.statusText}`,
        );
      const items = (await response.json()) as Record<string, unknown>[];

      for (const item of items) {
        const id = String(item[idField]);
        const data = await parseData({ id, data: item });
        const digest = generateDigest(data);
        store.set({ id, data, digest });
      }
    },
  };
}
