import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AddressDto } from 'src/app/model/location/locationDto';

@Injectable({
  providedIn: 'root'
})
export class ControlDataService {
  private dataStoredKey: string = 'Address';
  public handleSelectedAddressToChange = new Subject<AddressDto>();
  public handleSelectedAddressIndexToChange = new Subject<number>();
  public handleResetForm = new Subject<boolean>();

  constructor() { }

  public saveDataInLocalStorage(address: AddressDto) {
    let data = localStorage.getItem(this.dataStoredKey)
    if(data) {
      let listOfAddress = JSON.parse(data);
      listOfAddress.push(address);
      localStorage.removeItem(this.dataStoredKey);
      localStorage.setItem(this.dataStoredKey, JSON.stringify(listOfAddress));
    } else {
      localStorage.setItem(this.dataStoredKey, JSON.stringify([address]));
    }
  }

  public editDataInLocalStorage(index: number, newAddress: AddressDto) {
    let data = localStorage.getItem(this.dataStoredKey)
    if(data) {
      let listOfAddress = JSON.parse(data);
      listOfAddress[index] = newAddress;
      console.log(index);

      localStorage.removeItem(this.dataStoredKey);
      localStorage.setItem(this.dataStoredKey, JSON.stringify(listOfAddress));
    }
  }

  public readDataFromLocalStorage(): AddressDto[] {
    let data = localStorage.getItem(this.dataStoredKey);
    return data ? JSON.parse(data) : [];
  }

  public resetForm() {
    this.handleResetForm.next(true);
  }

  public selectAddressAndIndexToChange(address: AddressDto, index: number) {
    this.handleSelectedAddressToChange.next(address);
    this.handleSelectedAddressIndexToChange.next(index);
  }
}
