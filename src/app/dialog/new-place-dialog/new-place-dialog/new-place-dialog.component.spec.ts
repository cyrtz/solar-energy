import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlaceDialogComponent } from './new-place-dialog.component';

describe('NewPlaceDialogComponent', () => {
  let component: NewPlaceDialogComponent;
  let fixture: ComponentFixture<NewPlaceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPlaceDialogComponent]
    });
    fixture = TestBed.createComponent(NewPlaceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
