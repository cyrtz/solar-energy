import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationRecordComponent } from './operation-record.component';

describe('OperationRecordComponent', () => {
  let component: OperationRecordComponent;
  let fixture: ComponentFixture<OperationRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperationRecordComponent]
    });
    fixture = TestBed.createComponent(OperationRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
