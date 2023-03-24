import { TestBed } from '@angular/core/testing';

import { ControlDataService } from './control-data.service';

describe('ControlDataService', () => {
  let service: ControlDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
