import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDetectComponent } from './error-detect.component';

describe('ErrorDetectComponent', () => {
  let component: ErrorDetectComponent;
  let fixture: ComponentFixture<ErrorDetectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorDetectComponent]
    });
    fixture = TestBed.createComponent(ErrorDetectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
