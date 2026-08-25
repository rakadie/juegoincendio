import { EMERGENCY_GAME_VARIABLES } from '../domain/entities/emergency-training-content.js';
import { HISTORICAL_ARCHIVE } from './archive/index.js';
import { CAMPAIGN_CONTENT } from './campaign.js';
import { EDITORIAL_SCENARIO_CATALOG } from './editorial-scenario-catalog.js';
import { CANDIDATE_LIBRARY } from './library/index.js';
import { OFFICIAL_OPERATIONAL_SCENES } from './official-operational-scenes.js';
import { PREVENTION_INSPECTIONS } from './prevention-inspections.js';
import { NEW_GAME_SCENARIOS } from './scenarios/index.js';
import { VERTICAL_BETA_DECLARATIVE_CONTENT } from './vertical-beta-flow-content.js';

/**
 * Content contract used only by the editorial review tool.
 * It deliberately includes candidate and historical material that the player
 * runtime must never import.
 */
export const EDITORIAL_CONTENT = {
  variables: EMERGENCY_GAME_VARIABLES,
  scenarios: NEW_GAME_SCENARIOS,
  inspections: PREVENTION_INSPECTIONS,
  operationalScenes: OFFICIAL_OPERATIONAL_SCENES,
  verticalBetaFlowContent: VERTICAL_BETA_DECLARATIVE_CONTENT,
  campaign: CAMPAIGN_CONTENT,
  classification: EDITORIAL_SCENARIO_CATALOG,
  library: CANDIDATE_LIBRARY,
  archive: HISTORICAL_ARCHIVE
} as const;
