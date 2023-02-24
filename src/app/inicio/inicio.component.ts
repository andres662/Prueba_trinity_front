import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Productos } from '../Interface/Productos';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  id = 0;
  cargando = false;
  productos: Productos[] = [];
  formulario !: FormGroup
  editando = false;

  constructor(private router: Router, private api: ApiService, private frorm: FormBuilder) { }

  ngOnInit(): void {
    this.getProducto();
    this.formulario = this.frorm.group({
      nombreProducto: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required],
      total: ['', Validators.required],
    });
  }


  getProducto() {
    this.cargando = true;
    this.api.listar().subscribe({
      next: res => {
        this.productos = res;
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
        this.getProducto();
        this.formulario.reset();
        let cerrar = document.getElementById("cerrarDialogo");
        cerrar?.click();
        let mensaje = "El producto " + res.nombreProducto + "Fue registrado"
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
       this.getProducto();
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
    this.formulario.get('nombreProducto')?.setValue(data.nombreProducto);
    this.formulario.get('descripcion')?.setValue(data.descripcion);
    this.formulario.get('precio')?.setValue(data.precio);
    this.formulario.get('cantidad')?.setValue(data.cantidad);
    this.formulario.get('total')?.setValue(data.total);
    this.id = data.id;
  }

  eliminar(id:number){
    this.cargando = true;
    this.api.eliminar(id).subscribe({
     next:res=>{
       this.getProducto();
       let cerrar = document.getElementById("cerrarDialogo");
       cerrar?.click();
       let mensaje = "el producto" + " "+ res.nombre+ " "  + "fue actualizado"
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

  inventario(){
    this.router.navigate(['/inventario'])
  }

  clientes(){
    this.router.navigate(['/clientes'])
  }



}
