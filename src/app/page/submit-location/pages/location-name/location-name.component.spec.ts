import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationNameComponent } from './location-name.component';

describe('LocationNameComponent', () => {
  let component: LocationNameComponent;
  let fixture: ComponentFixture<LocationNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
