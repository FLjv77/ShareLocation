import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-upload-logo',
  templateUrl: './upload-logo.component.html',
  styleUrls: ['./upload-logo.component.css']
})
export class UploadLogoComponent implements OnInit {
  @Input() inputLabel: string;
  @Input() inputFormControl: FormControl;
  @Input() id: string;
  @Input() uploadType: number;
  @Output() loadRequestStatus = new EventEmitter<boolean>();

  public fileUrl: string = "../../../../assets/image/placeholder.png";
  public loading: boolean = false;
  public filePath: string;
  public file: File;

  constructor(
  ) { }

  ngOnInit(): void {
    this.initFilePath();
  }

  private initFilePath() {
    this.filePath = this.inputLabel;
  }
  async onChange(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.fileUrl = reader.result as string;
      this.filePath = event.target.files[0].name;
    }
    reader.readAsDataURL(this.file);
  }

  public onUpload() {}

}
