import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedColumnsDayComponent } from './stacked-columns-day.component';

describe('StackedColumnsDayComponent', () => {
  let component: StackedColumnsDayComponent;
  let fixture: ComponentFixture<StackedColumnsDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StackedColumnsDayComponent]
    });
    fixture = TestBed.createComponent(StackedColumnsDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
