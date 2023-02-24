import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaVentaComponent } from './categoria-venta.component';

describe('CategoriaVentaComponent', () => {
  let component: CategoriaVentaComponent;
  let fixture: ComponentFixture<CategoriaVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
