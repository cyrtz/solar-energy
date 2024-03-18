import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitManageComponent } from './unit-manage.component';

describe('UnitManageComponent', () => {
  let component: UnitManageComponent;
  let fixture: ComponentFixture<UnitManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitManageComponent]
    });
    fixture = TestBed.createComponent(UnitManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
