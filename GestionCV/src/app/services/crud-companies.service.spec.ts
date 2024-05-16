import { TestBed } from '@angular/core/testing';

import { CrudCompaniesService } from './crud-companies.service';

describe('CrudCompaniesService', () => {
  let service: CrudCompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudCompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
