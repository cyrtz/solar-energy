import { TestBed } from '@angular/core/testing';

import { OperationRecordService } from './operation-record.service';

describe('OperationRecordService', () => {
  let service: OperationRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
