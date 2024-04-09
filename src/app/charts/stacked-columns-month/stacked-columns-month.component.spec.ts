import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedColumnsMonthComponent } from './stacked-columns-month.component';

describe('StackedColumnsMonthComponent', () => {
  let component: StackedColumnsMonthComponent;
  let fixture: ComponentFixture<StackedColumnsMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StackedColumnsMonthComponent]
    });
    fixture = TestBed.createComponent(StackedColumnsMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
