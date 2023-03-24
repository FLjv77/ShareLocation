import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitLocationComponent } from './submit-location.component';

describe('SubmitLocationComponent', () => {
  let component: SubmitLocationComponent;
  let fixture: ComponentFixture<SubmitLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
