import { Coordinates } from '../value-objects/coordinates.js';
import { FireStatus } from './fire-status.js';

export class FireIncident {
  private constructor(
    public readonly id: string,
    public readonly location: Coordinates,
    public status: FireStatus
  ) {}

  public static create(id: string, location: Coordinates): FireIncident {
    if (!id || id.trim().length === 0) {
      throw new Error('INVALID_ID');
    }

    return new FireIncident(id, location, FireStatus.DETECTED);
  }

  public activate(): void {
    this.status = FireStatus.ACTIVE;
  }
}

