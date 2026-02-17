import { FireIncident } from '../../domain/entities/fire-incident.js';
import { FireStatus } from '../../domain/entities/fire-status.js';
import { FireIncidentRepository } from '../../domain/ports/fire-incident-repository.js';
import { Coordinates } from '../../domain/value-objects/coordinates.js';

export class InMemoryFireIncidentRepository implements FireIncidentRepository {
  private readonly incidents: FireIncident[];

  constructor(seed?: FireIncident[]) {
    this.incidents =
      seed ??
      [
        FireIncident.create('fire-1', Coordinates.create(40.4168, -3.7038)),
        FireIncident.create('fire-2', Coordinates.create(37.3891, -5.9845))
      ];

    this.incidents[0].activate();
  }

  async findActive(): Promise<FireIncident[]> {
    return this.incidents.filter(
      (incident) =>
        incident.status === FireStatus.ACTIVE ||
        incident.status === FireStatus.DETECTED
    );
  }
}

