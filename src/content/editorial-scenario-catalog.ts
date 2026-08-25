import type { Scenario } from '../domain/types/scenario.js';
import { OFFICIAL_SOURCE_SCENARIOS } from './official-scenario-sources.js';
import { NEW_GAME_SCENARIOS } from './scenarios/index.js';

export const MIGRATED_HISTORICAL_SCENARIO_IDS = [
  's-011-corte-carretera-acceso',
  's-025-cortafuego-emergencia',
  's-026-defensa-operativa-nucleo-viviendas',
  's-027-fuego-en-barranco',
  's-030-fuego-de-copas'
] as const;

export const HISTORICAL_ARCHIVE_SCENARIO_IDS = [
  's-000-introduccion',
  's-000b-avatar-emergencias',
  's-000c-contexto-prevencion-otono',
  's-000d-quemas-prescritas-otono',
  's-002b-asesoramiento-terrenos',
  's-010b-defensa-nucleo-viviendas',
  's-010d-zona-barranco',
  's-024-quema-tecnica',
  's-035-limpieza-alrededor-viviendas',
  's-038-eleccion-vegetacion-finca',
  ...MIGRATED_HISTORICAL_SCENARIO_IDS
] as const;

const archiveIdSet = new Set<string>(HISTORICAL_ARCHIVE_SCENARIO_IDS);
const scenarioById = new Map(NEW_GAME_SCENARIOS.map((scenario) => [scenario.id, scenario]));

function requireScenarios(ids: readonly string[]): Scenario[] {
  return ids.map((id) => {
    const scenario = scenarioById.get(id);
    if (scenario === undefined) throw new Error(`Editorial scenario catalog is missing ${id}.`);
    return scenario;
  });
}

export const EDITORIAL_OFFICIAL_SCENARIOS = OFFICIAL_SOURCE_SCENARIOS;
export const HISTORICAL_ARCHIVE_SCENARIOS = requireScenarios(
  HISTORICAL_ARCHIVE_SCENARIO_IDS
);
export const LIBRARY_CANDIDATE_SCENARIOS = NEW_GAME_SCENARIOS.filter(
  ({ id }) => !archiveIdSet.has(id)
);

if (
  EDITORIAL_OFFICIAL_SCENARIOS.length !== 5 ||
  LIBRARY_CANDIDATE_SCENARIOS.length !== 36 ||
  HISTORICAL_ARCHIVE_SCENARIOS.length !== 15 ||
  NEW_GAME_SCENARIOS.length !== 51
) {
  throw new Error(
    `Unexpected editorial scenario classification: official=${EDITORIAL_OFFICIAL_SCENARIOS.length}, ` +
      `library=${LIBRARY_CANDIDATE_SCENARIOS.length}, archive=${HISTORICAL_ARCHIVE_SCENARIOS.length}, ` +
      `historicalTotal=${NEW_GAME_SCENARIOS.length}.`
  );
}

export const EDITORIAL_SCENARIO_CATALOG = {
  official: EDITORIAL_OFFICIAL_SCENARIOS,
  library: LIBRARY_CANDIDATE_SCENARIOS,
  archive: HISTORICAL_ARCHIVE_SCENARIOS
} as const;
