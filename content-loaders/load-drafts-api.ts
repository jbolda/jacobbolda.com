import type { Loader, LoaderContext } from "astro/loaders";

interface DraftItem {
  name: string;
  content: string;
}

export function sourceDraftsApi({ endpoint }: { endpoint: string }): Loader {
  return {
    name: "drafts-api-loader",
    load: async ({ store, parseData, renderMarkdown, generateDigest, logger }: LoaderContext) => {
      let items: DraftItem[];
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        items = (await response.json()) as DraftItem[];
      } catch (error) {
        // fail closed: deploying without current drafts is worse than not deploying
        throw new Error(`drafts fetch failed from ${endpoint}: ${error}`);
      }

      for (const item of items) {
        try {
          const rendered = await renderMarkdown(item.content);
          const data = await parseData({
            id: item.name,
            data: rendered.metadata?.frontmatter ?? {},
          });
          store.set({
            id: item.name,
            data,
            rendered,
            digest: generateDigest(item.content),
          });
        } catch (error) {
          logger.error(`failed to load draft "${item.name}": ${error}`);
        }
      }
    },
  };
}
