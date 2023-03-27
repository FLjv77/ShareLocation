import { AfterViewInit, Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { AddressDto, LocationPoint } from 'src/app/model/location/locationDto';
import { ControlDataService } from 'src/app/service/controlDataService/control-data.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-location-on-map',
  templateUrl: './location-on-map.component.html',
  styleUrls: ['./location-on-map.component.css']
})
export class LocationOnMapComponent implements OnInit, AfterViewInit {

  @Output() location = new EventEmitter<LocationPoint>();

  private map: any;
  private selectedX: number;
  private selectedY: number;
  private marker: any;

  constructor(private controlDataService: ControlDataService) { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit(): void {
    this.subscribeResetForm();
    this.subscribeChangeAddress();
  }

  private subscribeResetForm() {
    this.controlDataService.handleResetForm.subscribe((res: boolean) => {
      if(res) {
        this.map.removeLayer(this.marker);
      }
    });
  }

  private subscribeChangeAddress() {
    this.controlDataService.handleSelectedAddressToChange.subscribe((res: AddressDto) => {
      this.addPointOnMap(res.location.lon, res.location.lat);
      this.location.emit(new LocationPoint(res.location.lon, res.location.lat));
    });
  }

  private addPointOnMap(x: number, y: number) {
    if(this.marker) this.map.removeLayer(this.marker);
    this.marker = L.marker([x, y]);
    this.marker.addTo(this.map);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 5
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
    });

    tiles.addTo(this.map);

    this.map.on("click", (e: any) => {
      this.selectedX = e.latlng.lat;
      this.selectedY = e.latlng.lng;
      this.addPointOnMap(this.selectedX, this.selectedY);
      this.location.emit(new LocationPoint(this.selectedX, this.selectedY));
    });
  }


}
