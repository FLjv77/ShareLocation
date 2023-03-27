import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AddressDto } from 'src/app/model/location/locationDto';
import { ControlDataService } from 'src/app/service/controlDataService/control-data.service';

@Component({
  selector: 'app-location-name',
  templateUrl: './location-name.component.html',
  styleUrls: ['./location-name.component.css']
})
export class LocationNameComponent implements OnInit {
  @Output() locationName = new EventEmitter<string>();
  public locationNameControl: FormControl;
  constructor(private controlDataService: ControlDataService) {}

  ngOnInit(): void {
    this.initFormControl();
    this.subscribeChangeAddress();
    this.checkValueChange();
    this.subscribeResetForm();
  }

  private subscribeChangeAddress() {
    this.controlDataService.handleSelectedAddressToChange.subscribe((res: AddressDto) => {
      this.locationNameControl.setValue(res.name);
      this.locationName.emit(res.name);
    });
  }

  private initFormControl () {
    this.locationNameControl = new FormControl('', Validators.required);
  }

  private checkValueChange() {
    this.locationNameControl.valueChanges.subscribe((value: string) => {
      this.locationName.emit(value);
    });
  }

  private subscribeResetForm() {
    this.controlDataService.handleResetForm.subscribe((res: boolean) => {
      if(res) {
        this.locationNameControl.reset();
      }
    });
  }

}
