import { Component, OnInit } from '@angular/core';
import { AddressDto, LocationPoint } from 'src/app/model/location/locationDto';
import { LocationType } from '../../model/location/locationDto';
import { ControlDataService } from 'src/app/service/controlDataService/control-data.service';

@Component({
  selector: 'app-submit-location',
  templateUrl: './submit-location.component.html',
  styleUrls: ['./submit-location.component.css']
})
export class SubmitLocationComponent implements OnInit {
  private address: AddressDto;
  public showEditButton: boolean = false;
  private selectedAddressToEdit: AddressDto;
  private selectedAddressIndexToEdit: number;
  constructor(private controlDataService: ControlDataService) { }

  ngOnInit(): void {
    this.address = new AddressDto();
    this.subscribeChangeAddress();
  }

  private subscribeChangeAddress() {
    this.controlDataService.handleSelectedAddressToChange.subscribe((res: AddressDto) => {
      if(res) {
        this.selectedAddressToEdit = res;
        this.showEditButton = true;
      }
    });

    this.controlDataService.handleSelectedAddressIndexToChange.subscribe((res: number) => {
      this.selectedAddressIndexToEdit = res;
    });
  }

  public setLocationName(value: string) {
    this.address.setName(value);
  }

  public setLocationPoint(location: LocationPoint) {
    this.address.setLocation(location);
  }

  public setLocationType(type: LocationType) {
    this.address.setType(type);
  }

  public setLocationLogo(url: string) {
    this.address.setLogo(url);
  }

  public checkAbleButton(): boolean {
    return ((this.address.location == null) || (this.address.logoUrl == null) || (this.address.name == null) || (this.address.type == null));
  }

  public submitData() {
    this.controlDataService.saveDataInLocalStorage(this.address);
    this.address = new AddressDto();
    this.controlDataService.resetForm();
  }


  public EditData() {
    this.controlDataService.editDataInLocalStorage(this.selectedAddressIndexToEdit, this.address);
    this.controlDataService.resetForm();
  }

  public clearForm() {
    this.controlDataService.resetForm();
  }

  public checkActiveEditButton() {
    let res = true;
    if(this.selectedAddressToEdit) {
      if(this.selectedAddressToEdit.name != this.address.name ||
        this.selectedAddressToEdit.logoUrl != this.address.logoUrl ||
        this.selectedAddressToEdit.location.lat != this.address.location.lat ||
        this.selectedAddressToEdit.location.lon != this.address.location.lon ||
        this.selectedAddressToEdit.type != this.address.type)
        res = false;
    }
    return res;
  }
}
