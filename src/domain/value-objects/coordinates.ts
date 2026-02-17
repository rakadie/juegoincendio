export class Coordinates {
  private constructor(
    public readonly latitude: number,
    public readonly longitude: number
  ) {
    if (latitude < -90 || latitude > 90) {
      throw new Error('INVALID_LATITUDE');
    }

    if (longitude < -180 || longitude > 180) {
      throw new Error('INVALID_LONGITUDE');
    }
  }

  public static create(latitude: number, longitude: number): Coordinates {
    return new Coordinates(latitude, longitude);
  }
}

