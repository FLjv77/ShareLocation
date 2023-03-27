import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddressDto } from 'src/app/model/location/locationDto';
import { ControlDataService } from 'src/app/service/controlDataService/control-data.service';

@Component({
  selector: 'app-upload-logo',
  templateUrl: './upload-logo.component.html',
  styleUrls: ['./upload-logo.component.css']
})
export class UploadLogoComponent implements OnInit {
  @Output() locationUrl = new EventEmitter<string>();

  public fileUrl: string = "../../../../assets/image/placeholder.png";
  public loading: boolean = false;
  public filePath: string;
  public file: File;

  constructor(
    private controlDataService: ControlDataService
  ) { }

  ngOnInit(): void {
    this.subscribeResetForm();
    this.subscribeChangeAddress();
  }

  private subscribeChangeAddress() {
    this.controlDataService.handleSelectedAddressToChange.subscribe((res: AddressDto) => {
      this.fileUrl = res.logoUrl;
      this.locationUrl.emit(this.fileUrl);
    });
  }

  private subscribeResetForm() {
    this.controlDataService.handleResetForm.subscribe((res: boolean) => {
      if(res) {
        this.fileUrl = "../../../../assets/image/placeholder.png";
      }
    });
  }

  async onChange(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.fileUrl = reader.result as string;
      this.filePath = event.target.files[0].name;
      this.locationUrl.emit(this.fileUrl);
    }
    reader.readAsDataURL(this.file);
  }

}
