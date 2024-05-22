import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDeviceByUnitDialogComponent } from './new-device-by-unit-dialog.component';

describe('NewDeviceByUnitDialogComponent', () => {
  let component: NewDeviceByUnitDialogComponent;
  let fixture: ComponentFixture<NewDeviceByUnitDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewDeviceByUnitDialogComponent]
    });
    fixture = TestBed.createComponent(NewDeviceByUnitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
