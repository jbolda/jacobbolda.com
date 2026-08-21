import {
  createFoundationSimulationServer,
  type FoundationSimulator,
} from "@simulacrum/foundation-simulator";

interface ContentItem {
  [key: string]: unknown;
}

interface ContentStore {
  uses: ContentItem[];
  curated: ContentItem[];
  shortlinks: ContentItem[];
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
          empty: { uses: [], curated: [], shortlinks: [] },
        }),
      }),
    },
    extendRouter(app, simulationStore) {
      app.get("/uses", (_req, res) => {
        const content = simulationStore.schema.content.selectById(
          simulationStore.store.getState(),
          { id: "default" },
        );
        res.json(content.uses);
      });

      app.get("/curated", (_req, res) => {
        const content = simulationStore.schema.content.selectById(
          simulationStore.store.getState(),
          { id: "default" },
        );
        res.json(content.curated);
      });

      app.get("/shortlinks", (_req, res) => {
        const content = simulationStore.schema.content.selectById(
          simulationStore.store.getState(),
          { id: "default" },
        );
        res.json(content.shortlinks);
      });
    },
  })();
}
