import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthCEmissionComponent } from './month-cemission.component';

describe('MonthCEmissionComponent', () => {
  let component: MonthCEmissionComponent;
  let fixture: ComponentFixture<MonthCEmissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthCEmissionComponent]
    });
    fixture = TestBed.createComponent(MonthCEmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
