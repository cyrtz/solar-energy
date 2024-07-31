import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceHistoryDialogComponent } from './device-history-dialog.component';

describe('DeviceHistoryDialogComponent', () => {
  let component: DeviceHistoryDialogComponent;
  let fixture: ComponentFixture<DeviceHistoryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceHistoryDialogComponent]
    });
    fixture = TestBed.createComponent(DeviceHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
