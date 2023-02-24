import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DepartamentoVenta } from '../InterfaceDepartamentoVenta/DepartamentoVenta.ts/DepartamentoVenta';
import { ApiService } from '../serviceDepartamentoVenta/api.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departamento-venta',
  templateUrl: './departamento-venta.component.html',
  styleUrls: ['./departamento-venta.component.css']
})
export class DepartamentoVentaComponent implements OnInit{

  id = 0;
  cargando = false;
  departamentoVenta: DepartamentoVenta[] = [];
  formulario !: FormGroup
  editando = false;

  constructor(private router: Router, private api: ApiService, private form: FormBuilder){}

  ngOnInit(): void {
    this.getDepartamentoVenta();
    this.formulario = this.form.group({
      nombreVendedor: ['', Validators.required],
      nombreCategoria: ['', Validators.required],
    });
  }

  getDepartamentoVenta() {
    this.cargando = true;
    this.api.listar().subscribe({
      next: res => {
        this.departamentoVenta = res;
        this.cargando = true;
      }, error: (err: HttpErrorResponse) => {
        alert(err.message);
        this.cargando = false
      }

    });
  }

  guardar() {
    this.cargando = true;
    this.api.guardar(this.formulario.value).subscribe({
      next: res => {
        this.getDepartamentoVenta();
        this.formulario.reset();
        let cerrar = document.getElementById("cerrarDialogo");
        cerrar?.click();
        let mensaje = "El vendedor " + res.nombreVendedor + "Fue registrado"
        Swal.fire(
          'Registro Exitoso',
          mensaje,
          'success'
        )
        this.cargando = false
      }, error: (err: HttpErrorResponse) => {
        alert(err.message);
        this.cargando = false
      }

    });
  }

  actulizar()
  {
    this.cargando = true;
    this.editarDatos = this.formulario.value;
    this.editarDatos["id"]=this.id;
    this.api.actulizar(this.editarDatos).subscribe({
     next:res=>{
       this.getDepartamentoVenta();
       this.formulario.reset();
       let cerrar = document.getElementById("cerrarDialogo");
       cerrar?.click();
       let mensaje = "El producto" + " "+ res.nombreProducto+ " " + "fue actualizado"
       Swal.fire(
        'Actulizacion Exitosa',
        mensaje,
        'success'
      )
       this.cargando = false;

     },
     error:(err: HttpErrorResponse)=>{
       this.cargando = false;
       if(err.status==0){
       Swal.fire(
        'Upss, . :'+ err.status,
        //err.status+"" + err.statusText,
        'error'
       )
       }else if(err.status==500){
        Swal.fire(
          'Upss, el estudiante con la iddentidad. :'+ this.editarDatos.iddentidad + "no existe",
          //err.status+"" + err.statusText,
          'error'
        )
       }

     }
    });

  }

  editarDatos !: any;
  editar(data: any){
    this.editando=true;
    this.formulario.get('nombreProducto')?.setValue(data.nombreVendedor);
    this.formulario.get('descripcion')?.setValue(data.nombreCategoria);
    this.id = data.id;
  }

  eliminar(id:number){
    this.cargando = true;
    this.api.eliminar(id).subscribe({
     next:res=>{
       this.getDepartamentoVenta();
       let cerrar = document.getElementById("cerrarDialogo");
       cerrar?.click();
       let mensaje = "el producto" + " "+ res.nombreVendedor+ " "  + "fue actualizado"
        Swal.fire(
          'Actulizacion Exitosa',
          mensaje,
          'success'
        )
       
        Swal.fire(
          'Actulizacion Exitosa',
          mensaje,
          'error'
        )
       
       this.formulario.reset();
       
       this.cargando = false;

     },
     error:(err: HttpErrorResponse)=>{
       this.cargando = false;
       if(err.status==0){
       Swal.fire(
        'Upss, . :'+ err.status,
        //err.status+"" + err.statusText,
        'error'
       )
       }else if(err.status==500){
        Swal.fire(
          'Upss, el estudiante con la iddentidad. :'+ this.editarDatos.iddentidad + "no existe",
          //err.status+"" + err.statusText,
          'error'
        )
       }

     }
    });
  }

  nuevo(){
    this.editando=false;
  }

  clientes(){
    this.router.navigate(['/clientes'])
  }

}
