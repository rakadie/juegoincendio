import {
  SUMMER_CAMPAIGN_NODES,
  WINTER_CAMPAIGN_NODES
} from '../campaign.js';
import { HISTORICAL_ARCHIVE_SCENARIOS } from '../editorial-scenario-catalog.js';
import {
  PREVENTION_INSPECTION_FINCAS,
  PREVENTION_INSPECTION_INTERFAZ
} from '../prevention-inspections.js';

export const HISTORICAL_ARCHIVE = {
  scenarios: HISTORICAL_ARCHIVE_SCENARIOS,
  inspections: [PREVENTION_INSPECTION_INTERFAZ, PREVENTION_INSPECTION_FINCAS],
  campaignNodes: {
    prevention: WINTER_CAMPAIGN_NODES,
    crisis: SUMMER_CAMPAIGN_NODES
  }
} as const;
