import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceManageComponent } from './place-manage.component';

describe('PlaceManageComponent', () => {
  let component: PlaceManageComponent;
  let fixture: ComponentFixture<PlaceManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceManageComponent]
    });
    fixture = TestBed.createComponent(PlaceManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
