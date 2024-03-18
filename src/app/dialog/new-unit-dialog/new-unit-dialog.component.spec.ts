import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUnitDialogComponent } from './new-unit-dialog.component';

describe('NewUnitDialogComponent', () => {
  let component: NewUnitDialogComponent;
  let fixture: ComponentFixture<NewUnitDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewUnitDialogComponent]
    });
    fixture = TestBed.createComponent(NewUnitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
