import { TestBed } from '@angular/core/testing';

import { FlagServiceService } from './flag-service.service';

describe('FlagServiceService', () => {
  let service: FlagServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlagServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
