import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedColumnsWeekComponent } from './stacked-columns-week.component';

describe('StackedColumnsWeekComponent', () => {
  let component: StackedColumnsWeekComponent;
  let fixture: ComponentFixture<StackedColumnsWeekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StackedColumnsWeekComponent]
    });
    fixture = TestBed.createComponent(StackedColumnsWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
