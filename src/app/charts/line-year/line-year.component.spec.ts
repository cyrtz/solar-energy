import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineYearComponent } from './line-year.component';

describe('LineYearComponent', () => {
  let component: LineYearComponent;
  let fixture: ComponentFixture<LineYearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineYearComponent]
    });
    fixture = TestBed.createComponent(LineYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
