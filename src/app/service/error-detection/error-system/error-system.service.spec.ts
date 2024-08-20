import { TestBed } from '@angular/core/testing';

import { ErrorSystemService } from './error-system.service';

describe('ErrorSystemService', () => {
  let service: ErrorSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
