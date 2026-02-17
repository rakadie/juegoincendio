import { FireIncident } from '../entities/fire-incident.js';

export interface FireIncidentRepository {
  findActive(): Promise<FireIncident[]>;
}

