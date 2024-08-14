import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDeviceComponent } from './error-device.component';

describe('ErrorDeviceComponent', () => {
  let component: ErrorDeviceComponent;
  let fixture: ComponentFixture<ErrorDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorDeviceComponent]
    });
    fixture = TestBed.createComponent(ErrorDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
