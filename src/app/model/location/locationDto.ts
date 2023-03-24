export class AddressDto {
  name: string;
  lon: number;
  lat: number;
  logoUrl: string;
  type: LocationType;

  constructor(
    name: string,
    lon: number,
    lat: number,
    logoUrl: string,
    type: LocationType
  ) {
    this.name = name;
    this.lon = lon;
    this.lat = lat;
    this.logoUrl = logoUrl;
    this.type = type;
  }
}

export enum LocationType {
  busines, home, sport, cultural
}
