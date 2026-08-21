import {
  createFoundationSimulationServer,
  type FoundationSimulator,
} from "@simulacrum/foundation-simulator";

interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
}

interface AirtableTable {
  records: AirtableRecord[];
}

const emptyAirtableTable: AirtableTable = { records: [] };

export function createAirtableSimulation(): FoundationSimulator<Record<string, unknown>> {
  return createFoundationSimulationServer({
    port: 0,
    extendStore: {
      schema: ({ slice }) => ({
        tables: slice.table<AirtableTable>({
          initialState: {
            "appcL6Jdj7ZrhTg4q/Recipes": {
              records: [
                {
                  id: "recr1",
                  fields: {
                    name: "Test Lasagna",
                    ingredients: "- Lasagna sheets\n- Cheese",
                    directions: "1. Layer the sheets\n2. Bake at 375",
                  },
                },
              ],
            },
            "appcL6Jdj7ZrhTg4q/Style": {
              records: [{ id: "recs1", fields: { Name: "Italian", Recipes: ["Test Lasagna"] } }],
            },
            "appcL6Jdj7ZrhTg4q/Cooking Method": {
              records: [{ id: "reccm1", fields: { Name: "Baked", Recipes: ["Test Lasagna"] } }],
            },
          },
          empty: emptyAirtableTable,
        }),
      }),
    },
    extendRouter(app, simulationStore) {
      app.get("/v0/:baseId/:table", (req, res) => {
        const key = `${req.params.baseId}/${req.params.table}`;
        const { records } = simulationStore.schema.tables.selectById(
          simulationStore.store.getState(),
          { id: key },
        );
        res.json({ records });
      });
    },
  })();
}
