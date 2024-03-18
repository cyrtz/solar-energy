import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUnitDialogComponent } from './delete-unit-dialog.component';

describe('DeleteUnitDialogComponent', () => {
  let component: DeleteUnitDialogComponent;
  let fixture: ComponentFixture<DeleteUnitDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteUnitDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteUnitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
