import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inventario} from '../InterfaceInventario/Inventario';
import { ApiService } from '../serviceInventario/api.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit{

  id = 0;
  cargando = false;
  inventario: Inventario[] = [];
  formulario !: FormGroup
  editando = false;

  constructor(private router: Router, private api: ApiService, private frorm: FormBuilder){}
  ngOnInit(): void {
    this.getInventario();
    this.formulario = this.frorm.group({
      nombreProducto: ['', Validators.required],
      nombreCategoria: ['', Validators.required],
    })
  }

  getInventario() {
    this.cargando = true;
    this.api.listar().subscribe({
      next: res => {
        this.inventario = res;
        this.cargando = true;
      }, error: (err: HttpErrorResponse) => {
        alert(err.message);
        this.cargando = false
      }

    });
  }

  guardar(){
    this.cargando = true;
    this.api.guardar(this.formulario.value).subscribe({
      next: res => {
        this.getInventario();
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

  actulizar(){
    this.cargando = true;
    this.editarDatos = this.formulario.value;
    this.editarDatos["id"]=this.id;
    this.api.actulizar(this.editarDatos).subscribe({
     next:res=>{
       this.getInventario();
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
    this.formulario.get('nombreCategoria')?.setValue(data.nombreCategoria);
    this.id = data.id;

  }

  eliminar(id:number){

    this.cargando = true;
    this.api.eliminar(id).subscribe({
     next:res=>{
       this.getInventario();
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

  producto(){
    this.router.navigate(['/home'])
  }

  nuevo(){
    this.editando=false;
  }
  
}
