import path from "node:path";
import { fileURLToPath } from "node:url";

import { simulationCLI, useServiceGraph, useSimulation } from "@simulacrum/server";

import { createAirtableSimulation } from "./airtable.ts";
import { createDraftsSimulation } from "./drafts.ts";

export const serviceGraph = useServiceGraph({
  airtable: {
    operation: useSimulation("airtable", createAirtableSimulation),
  },
  drafts: {
    operation: useSimulation("drafts", createDraftsSimulation),
  },
});

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await simulationCLI(serviceGraph);
}
