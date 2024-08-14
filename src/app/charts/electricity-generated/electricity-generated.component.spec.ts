import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricityGeneratedComponent } from './electricity-generated.component';

describe('ElectricityGeneratedComponent', () => {
  let component: ElectricityGeneratedComponent;
  let fixture: ComponentFixture<ElectricityGeneratedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectricityGeneratedComponent]
    });
    fixture = TestBed.createComponent(ElectricityGeneratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
