import { getVerticalBetaI18nCatalog } from './i18n/vertical-beta-locale.js';
import { OFFICIAL_OPERATIONAL_SCENES } from './official-operational-scenes.js';
import { OFFICIAL_PREVENTION_INSPECTIONS } from './official-prevention-inspections.js';
import { OFFICIAL_SOURCE_SCENARIOS } from './official-scenario-sources.js';
import { VERTICAL_BETA_CATALOG } from './vertical-beta-catalog.js';
import { VERTICAL_BETA_DECLARATIVE_CONTENT } from './vertical-beta-flow-content.js';

const officialI18n = getVerticalBetaI18nCatalog('es');

/**
 * Sole content contract consumed by the player runtime.
 * Candidate-library and historical-archive modules are deliberately absent.
 */
export const VERTICAL_BETA_PLAYER_CONTENT = {
  catalog: VERTICAL_BETA_CATALOG,
  i18n: officialI18n,
  scenarios: OFFICIAL_SOURCE_SCENARIOS,
  inspections: OFFICIAL_PREVENTION_INSPECTIONS,
  operationalScenes: OFFICIAL_OPERATIONAL_SCENES,
  declarativeContent: VERTICAL_BETA_DECLARATIVE_CONTENT
} as const;
