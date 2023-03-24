import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationOnMapComponent } from './location-on-map.component';

describe('LocationOnMapComponent', () => {
  let component: LocationOnMapComponent;
  let fixture: ComponentFixture<LocationOnMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationOnMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationOnMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
