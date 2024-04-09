import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedColumnsYearComponent } from './stacked-columns-year.component';

describe('StackedColumnsYearComponent', () => {
  let component: StackedColumnsYearComponent;
  let fixture: ComponentFixture<StackedColumnsYearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StackedColumnsYearComponent]
    });
    fixture = TestBed.createComponent(StackedColumnsYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
