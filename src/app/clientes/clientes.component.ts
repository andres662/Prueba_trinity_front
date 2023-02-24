import { Component, OnInit } from '@angular/core';
import { Clientes } from '../InterfaceClientes/Clientes';
import { ApiService } from '../serviceClientes/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{

  id = 0;
  cargando = false;
  clientes: Clientes[]=[]
  formulario !: FormGroup
  editando = false;

  constructor(private router: Router,private api: ApiService, private forms: FormBuilder){}

  ngOnInit(): void {
    this.getClientes();
    this.formulario = this.forms.group({
      cedula: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }

 

  getClientes() {
    this.cargando = true;
    this.api.listar().subscribe({
      next: res => {
        this.clientes = res;
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
        this.getClientes();
        this.formulario.reset();
        let cerrar = document.getElementById("cerrarDialogo");
        cerrar?.click();
        let mensaje = "El cliente con cedula " + res.cedula + " Fue registrado"
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
       this.getClientes();
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
    this.formulario.get('nombreProducto')?.setValue(data.cedula);
    this.formulario.get('descripcion')?.setValue(data.direccion);
    this.id = data.id;
  }

  eliminar(id:number){
    this.cargando = true;
    this.api.eliminar(id).subscribe({
     next:res=>{
       this.getClientes();
       let cerrar = document.getElementById("cerrarDialogo");
       cerrar?.click();
       let mensaje = "el cliente con cedula" + " "+ res.cedula+ " "  + "fue actualizado"
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
          'Upss, el cliente con la iddentidad. :'+ this.editarDatos.cedula + "no existe",
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

  departamentoVenta(){
    this.router.navigate(['/departamento-venta'])
  }

  planSepare(){
    this.router.navigate(['/plan-separe'])
  }
  producto(){
    this.router.navigate(['/home'])
  }
}
