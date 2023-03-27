import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationNameComponent } from './page/submit-location/pages/location-name/location-name.component';
import { LocationOnMapComponent } from './page/submit-location/pages/location-on-map/location-on-map.component';
import { LocationTypeComponent } from './page/submit-location/pages/location-type/location-type.component';
import { UploadLogoComponent } from './page/submit-location/pages/upload-logo/upload-logo.component';
import { SubmitLocationComponent } from './page/submit-location/submit-location.component';
import { ViewLocationComponent } from './page/view-location/view-location.component';
import { ControlDataService } from './service/controlDataService/control-data.service';

@NgModule({
  declarations: [
    AppComponent,
    SubmitLocationComponent,
    ViewLocationComponent,
    UploadLogoComponent,
    LocationNameComponent,
    LocationTypeComponent,
    LocationOnMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    ControlDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
