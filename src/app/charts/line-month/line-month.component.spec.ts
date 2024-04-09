import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineMonthComponent } from './line-month.component';

describe('LineMonthComponent', () => {
  let component: LineMonthComponent;
  let fixture: ComponentFixture<LineMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineMonthComponent]
    });
    fixture = TestBed.createComponent(LineMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
