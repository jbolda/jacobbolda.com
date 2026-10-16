import path from "node:path";
import { fileURLToPath } from "node:url";

import { main } from "effection";
import { simulationCLIOp, useServiceGraph, useSimulation } from "@simulacrum/server";

import { createContentApiSimulation } from "./content-api.ts";

export const serviceGraph = useServiceGraph({
  contentApi: {
    operation: useSimulation("content-api", createContentApiSimulation),
  },
});

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main(() => simulationCLIOp(serviceGraph));
}
