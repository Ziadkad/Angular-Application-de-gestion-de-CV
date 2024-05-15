import { TestBed } from '@angular/core/testing';

import { CrudCandidatesService } from './crud-candidates.service';

describe('CrudCandidatesService', () => {
  let service: CrudCandidatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudCandidatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
