import { TestBed } from '@angular/core/testing';

import { ErrorDeviceService } from './error-device.service';

describe('ErrorDeviceService', () => {
  let service: ErrorDeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorDeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
