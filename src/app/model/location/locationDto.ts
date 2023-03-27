export class AddressDto {
  name: string;
  logoUrl: string;
  type: LocationType;
  location: LocationPoint;

  public setName(name: string) { this.name = name;}
  public setLocation(location: LocationPoint) {
    this.location = location;
  }
  public setType(type: LocationType) {
    this.type = type;
  }
  public setLogo(url: string) {
    this.logoUrl = url;
  }
}

export class LocationPoint {
  lon: number;
  lat: number;
  constructor(lon: number, lat: number) {
    this.lon = lon;
    this.lat = lat;
  }
}

export enum LocationType {
  busines, home, sport, cultural
}
