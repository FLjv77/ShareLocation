import { Component, OnInit } from '@angular/core';
import { ControlDataService } from 'src/app/service/controlDataService/control-data.service';
import { AddressDto, LocationType } from '../../model/location/locationDto';
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
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.css']
})
export class ViewLocationComponent implements OnInit {
  private listAddress: AddressDto[] = [];
  private map: any;

  constructor(private controlDataService: ControlDataService) { }

  ngOnInit(): void {
    this.readDataFromLocalStorage();
  }

  private readDataFromLocalStorage() {
    this.listAddress = this.controlDataService.readDataFromLocalStorage();
    if(this.listAddress.length > 0) this.initMap();
  }

  public refresh() {
    location.reload();
  }

  private initMap() {
    this.map = L.map('allLocationOnMap', {
      center: [ 39.8282, -98.5795 ],
      zoom: 5
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    this.listenOpenPopup();

    for(let i=0; i<this.listAddress.length; i++) {
      let marker = L.marker([this.listAddress[i].location.lon, this.listAddress[i].location.lat]);
      marker.addTo(this.map);

      marker.bindPopup(
        "<div style='background:white; width: 100px; height: 100px;'>"
      + "<img style='width: 40px; height: 40px; border-radius: 30px;' src=" + this.listAddress[i].logoUrl + ">"
      + "<div> Name: " + this.listAddress[i].name + "</div>"
      + "<div> Type: " + this.getTypeInStreang(this.listAddress[i].type) + "</div>"
      + "<button style='width: 100%; background-color: rgb(57, 138, 218); border: none; border-radius: 4px; color: #ffff; margin-top: 5px; cursor: pointer; height: 20px;'"
      + " id='" + i + "' >Edit</button>"
      + "</div>",
        {
            offset: [10, 0],
            className: i.toString(),
        });
    }
  }

  public checkShowContent(): boolean {
    return this.listAddress.length > 0;
  }

  private listenOpenPopup() {
    this.map.on('popupopen', (e: any)=> {
      this.listenEditLocation(e.popup.options.className);
    });
  }

  private listenEditLocation(name: string) {
    let editButton = document.getElementById(name);
    if(editButton) {
      editButton.onclick = () => {
        this.controlDataService.selectAddressAndIndexToChange(this.listAddress[Number(name)], Number(name));
      }
    }
  }

  private getTypeInStreang(type: LocationType): string {
    let res = '';
    switch(Number(type)) {
      case 0: {
        res = 'Busines';
        break;
      }
      case 1: {
        res = 'Home';
        break;
      }
      case 2: {
         res = 'Sport';
         break;
      }
      case 3: {
        res = 'Cultural';
        break;
      }
    }
    return res;
  }
}
