import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineDayComponent } from './line-day.component';

describe('LineDayComponent', () => {
  let component: LineDayComponent;
  let fixture: ComponentFixture<LineDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineDayComponent]
    });
    fixture = TestBed.createComponent(LineDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
