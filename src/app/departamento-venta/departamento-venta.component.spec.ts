import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoVentaComponent } from './departamento-venta.component';

describe('DepartamentoVentaComponent', () => {
  let component: DepartamentoVentaComponent;
  let fixture: ComponentFixture<DepartamentoVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartamentoVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartamentoVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
