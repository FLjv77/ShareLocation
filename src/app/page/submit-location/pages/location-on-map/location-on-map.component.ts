import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

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

  private map: any;
  private selectedX: number;
  private selectedY: number;
  private marker: any;
  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.map.on("click", (e: any) => {
      if(this.marker) this.map.removeLayer(this.marker);
      this.selectedX = e.latlng.lat;
      this.selectedY = e.latlng.lng;
      this.marker = L.marker([this.selectedX, this.selectedY]);
      this.marker.addTo(this.map);
      //this.marker.bindTooltip('tooltipTxt', {direction: 'bottom', offset: [15, 25], permanent: true});

      this.marker.bindTooltip("<div style='background:white; padding:1px 3px 1px 3px'><b>" + 'area.toFixed(1)' + "</b></div>",
        {
            direction: 'right',
            permanent: false,
            sticky: true,
            offset: [10, 0],
            opacity: 0.75,
            className: 'leaflet-tooltip-own'
        });
    });


  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit(): void {
  }

}
