import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { InventarioComponent } from './inventario/inventario.component';
import { PlanSepareComponent } from './plan-separe/plan-separe.component';
import { ClientesComponent } from './clientes/clientes.component';
import { DepartamentoVentaComponent } from './departamento-venta/departamento-venta.component';



const routes: Routes = [

  { 
      path:'',pathMatch:'full', redirectTo:'home',
    },
    {
      path: 'home', component: InicioComponent 
    },
    {
      path: 'inventario', component: InventarioComponent 
    },
    {
      path: 'clientes', component: ClientesComponent 
    },
    {
      path: 'plan-separe', component: PlanSepareComponent 
    },
    {
      path: 'departamento-venta', component: DepartamentoVentaComponent
    }
   


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
