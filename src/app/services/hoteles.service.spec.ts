import { TestBed } from '@angular/core/testing';

import { HotelesServiceTsService } from './hoteles.service';

describe('HotelesServiceTsService', () => {
  let service: HotelesServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelesServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
