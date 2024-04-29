import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineWeekComponent } from './line-week.component';

describe('LineWeekComponent', () => {
  let component: LineWeekComponent;
  let fixture: ComponentFixture<LineWeekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineWeekComponent]
    });
    fixture = TestBed.createComponent(LineWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
