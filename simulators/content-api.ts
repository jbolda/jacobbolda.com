import {
  createFoundationSimulationServer,
  type FoundationSimulator,
} from "@simulacrum/foundation-simulator";

interface ContentItem {
  [key: string]: unknown;
}

interface DraftItem {
  name: string;
  content: string;
}

interface ContentStore {
  uses: ContentItem[];
  curated: ContentItem[];
  shortlinks: ContentItem[];
  drafts: DraftItem[];
}

const initialContent: ContentStore = {
  uses: [
    {
      title: "MacBook Air",
      subtitle: "M1 13-inch",
      url: "https://example.com/macbook",
    },
    { title: "VS Code", subtitle: "Editor" },
  ],
  curated: [{ url: "https://example.com/curated", order: 1 }],
  shortlinks: [{ slug: "test", url: "https://example.com", active: true }],
  drafts: [
    {
      name: "article.lorem-ipsum",
      content: `---
title: De Rebus Quibusdam (Draft)
progress: growth
written: 2024-06-15
description: A draft placeholder post written in Latin.
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
`,
    },
  ],
};

export function createContentApiSimulation(): FoundationSimulator<Record<string, unknown>> {
  return createFoundationSimulationServer({
    port: 0,
    extendStore: {
      schema: ({ slice }) => ({
        content: slice.table<ContentStore>({
          initialState: {
            default: initialContent,
          },
          empty: { uses: [], curated: [], shortlinks: [], drafts: [] },
        }),
      }),
    },
    extendRouter(app, simulationStore) {
      const getContent = () => {
        return simulationStore.schema.content.selectById(
          simulationStore.store.getState(),
          { id: "default" },
        );
      };

      const getDrafts = () => getContent().drafts;

      const setDrafts = (drafts: DraftItem[]) => {
        simulationStore.store.dispatch(
          simulationStore.actions.batchUpdater([
            simulationStore.schema.content.patch({ default: { drafts } }),
          ]),
        );
      };

      app.get("/uses", (_req, res) => {
        res.json(getContent().uses);
      });

      app.get("/curated", (_req, res) => {
        res.json(getContent().curated);
      });

      app.get("/shortlinks", (_req, res) => {
        res.json(getContent().shortlinks);
      });

      app.get("/drafts", (_req, res) => {
        res.json(getDrafts());
      });

      // PUT/DELETE mutate the store so scripts can be tested against the simulator
      app.put("/drafts/:name", (req, res) => {
        const { name } = req.params;
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
          const drafts = getDrafts().filter((d) => d.name !== name);
          drafts.push({ name, content: body });
          setDrafts(drafts);
          res.json({ ok: true, name });
        });
      });

      app.delete("/drafts/:name", (req, res) => {
        const { name } = req.params;
        setDrafts(getDrafts().filter((d) => d.name !== name));
        res.json({ ok: true, deleted: name });
      });
    },
  })();
}
