import {
  createFoundationSimulationServer,
  type FoundationSimulator,
} from "@simulacrum/foundation-simulator";

interface DraftFile {
  name: string;
  blob: string;
}

const emptyDraftFile: DraftFile = { name: "", blob: "" };

export function createDraftsSimulation(): FoundationSimulator<
  Record<string, unknown>
> {
  return createFoundationSimulationServer({
    port: 0,
    extendStore: {
      schema: ({ slice }) => ({
        drafts: slice.table<DraftFile>({
          initialState: {
            "article.lorem-ipsum.md": {
              name: "article.lorem-ipsum.md",
              blob: `---
title: De Rebus Quibusdam (Draft)
progress: growth
written: 2024-06-15
description: A draft placeholder post written in Latin.
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## Ut Enim Ad Minim

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

- Lorem ipsum dolor sit amet
- Consectetur adipiscing elit
- Sed do eiusmod tempor

### Nemo Enim Ipsam Voluptatem

Quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
`,
            },
          },
          empty: emptyDraftFile,
        }),
      }),
    },
    extendRouter(app, simulationStore) {
      app.post("/drafts", (_req, res) => {
        const result = simulationStore.schema.drafts.selectTableAsList(
          simulationStore.store.getState(),
        );
        res.json({
          result,
          name: "all-files.json",
          mimeType: "application/json",
        });
      });
    },
  })();
}
