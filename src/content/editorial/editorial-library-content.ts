import { ARCHIVED_CAMPAIGN_CONTENT } from '../campaign.js';
import {
  CRISIS_ROUTE_MODULE,
  FIRST_ALERT_SCENARIO,
  PREVENTION_BALANCE
} from '../prevention-balance.js';
import { PREVENTION_INSPECTIONS } from '../prevention-inspections.js';
import { EDITORIAL_SCENARIO_LIBRARY } from '../scenarios/index.js';

export const EDITORIAL_LIBRARY_CONTENT = {
  schemaVersion: 1,
  scope: 'biblioteca-y-archivo',
  scenarios: EDITORIAL_SCENARIO_LIBRARY,
  archive: {
    campaign: ARCHIVED_CAMPAIGN_CONTENT,
    preventionInspections: PREVENTION_INSPECTIONS,
    preventionBalance: PREVENTION_BALANCE,
    firstAlert: FIRST_ALERT_SCENARIO,
    crisisRouteModule: CRISIS_ROUTE_MODULE
  }
} as const;
