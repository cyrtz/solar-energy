import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSystemComponent } from './error-system.component';

describe('ErrorSystemComponent', () => {
  let component: ErrorSystemComponent;
  let fixture: ComponentFixture<ErrorSystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorSystemComponent]
    });
    fixture = TestBed.createComponent(ErrorSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
