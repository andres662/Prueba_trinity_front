import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSepareComponent } from './plan-separe.component';

describe('PlanSepareComponent', () => {
  let component: PlanSepareComponent;
  let fixture: ComponentFixture<PlanSepareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanSepareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanSepareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
