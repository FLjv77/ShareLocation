import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AddressDto, LocationType } from 'src/app/model/location/locationDto';
import { ControlDataService } from 'src/app/service/controlDataService/control-data.service';

@Component({
  selector: 'app-location-type',
  templateUrl: './location-type.component.html',
  styleUrls: ['./location-type.component.css']
})
export class LocationTypeComponent implements OnInit {
  @Output() locationType = new EventEmitter<LocationType|any>();
  public type: LocationType;
  constructor(private controlDataService: ControlDataService) { }

  ngOnInit(): void {
    this.subscribeResetForm();
    this.subscribeChangeAddress();
  }

  private subscribeChangeAddress() {
    this.controlDataService.handleSelectedAddressToChange.subscribe((res: AddressDto) => {
      this.type = res.type;
      this.locationType.emit(res.type);
    });
  }

  private subscribeResetForm() {
    this.controlDataService.handleResetForm.subscribe((res: boolean) => {
      if(res) {
        this.type = 0;
      }
    })
  }

  public setType() {
    let value = (<HTMLInputElement>document.getElementById('type')).value;
    if(value !== undefined) this.locationType.emit(value);
  }
}
