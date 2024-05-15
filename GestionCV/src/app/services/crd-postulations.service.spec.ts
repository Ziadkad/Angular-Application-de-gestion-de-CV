import { TestBed } from '@angular/core/testing';

import { CrdPostulationsService } from './crd-postulations.service';

describe('CrdPostulationsService', () => {
  let service: CrdPostulationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrdPostulationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
