import { LIBRARY_CANDIDATE_SCENARIOS } from '../editorial-scenario-catalog.js';
import { PREVENTION_INSPECTION_COMUNIDAD } from '../prevention-inspections.js';

export const CANDIDATE_LIBRARY = {
  scenarios: LIBRARY_CANDIDATE_SCENARIOS,
  inspections: [PREVENTION_INSPECTION_COMUNIDAD]
} as const;
