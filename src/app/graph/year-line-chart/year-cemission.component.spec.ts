import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearCEmissionComponent } from './year-cemission.component';

describe('YearCEmissionComponent', () => {
  let component: YearCEmissionComponent;
  let fixture: ComponentFixture<YearCEmissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YearCEmissionComponent]
    });
    fixture = TestBed.createComponent(YearCEmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
