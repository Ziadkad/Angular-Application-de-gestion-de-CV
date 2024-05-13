import { TestBed } from '@angular/core/testing';

import { CrudJobOffersService } from './crud-job-offers.service';

describe('CrudJobOffersService', () => {
  let service: CrudJobOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudJobOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
