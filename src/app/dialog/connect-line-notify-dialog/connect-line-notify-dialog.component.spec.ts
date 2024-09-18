import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectLineNotifyDialogComponent } from './connect-line-notify-dialog.component';

describe('ConnectLineNotifyDialogComponent', () => {
  let component: ConnectLineNotifyDialogComponent;
  let fixture: ComponentFixture<ConnectLineNotifyDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectLineNotifyDialogComponent]
    });
    fixture = TestBed.createComponent(ConnectLineNotifyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
