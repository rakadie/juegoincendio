import { FireIncidentRepository } from '../../domain/ports/fire-incident-repository.js';

export interface ActiveFireDTO {
  id: string;
  latitude: number;
  longitude: number;
  status: string;
}

export class GetActiveFiresQueryHandler {
  constructor(private readonly repository: FireIncidentRepository) {}

  async execute(): Promise<ActiveFireDTO[]> {
    const incidents = await this.repository.findActive();

    return incidents.map((incident) => ({
      id: incident.id,
      latitude: incident.location.latitude,
      longitude: incident.location.longitude,
      status: incident.status
    }));
  }
}

