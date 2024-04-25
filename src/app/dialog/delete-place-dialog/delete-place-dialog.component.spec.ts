import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePlaceDialogComponent } from './delete-place-dialog.component';

describe('DeletePlaceDialogComponent', () => {
  let component: DeletePlaceDialogComponent;
  let fixture: ComponentFixture<DeletePlaceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletePlaceDialogComponent]
    });
    fixture = TestBed.createComponent(DeletePlaceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
