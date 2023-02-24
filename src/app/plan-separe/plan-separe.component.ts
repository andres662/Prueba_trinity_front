import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicePlan_Separe/api.service';
import { PlanSepare } from '../InterfacePlanSepare/PlanSepare';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan-separe',
  templateUrl: './plan-separe.component.html',
  styleUrls: ['./plan-separe.component.css']
})
export class PlanSepareComponent implements OnInit{

  id = 0;
  cargando = false;
  planSepare: PlanSepare[] = [];
  formulario !: FormGroup
  editando = false;


  constructor(private router:Router , private api: ApiService, private form: FormBuilder){}
  ngOnInit(): void {
    this.getplanSepare();
    this.formulario = this.form.group({
      productosSeparados: ['', Validators.required],
      cantidadCompras: ['', Validators.required],
      
    });
    
  }

  getplanSepare(){
    
      this.cargando = true;
      this.api.listar().subscribe({
        next: res => {
          this.planSepare = res;
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
        this.getplanSepare();
        this.formulario.reset();
        let cerrar = document.getElementById("cerrarDialogo");
        cerrar?.click();
        let mensaje = "El producto separado " + res.productosSeparados + "Fue registrado"
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

  editarDatos !: any;
  editar(data: any){
    this.editando=true;
    this.formulario.get('nombreProducto')?.setValue(data.productosSeparados);
    this.formulario.get('descripcion')?.setValue(data.cantidadCompras);
    this.id = data.id;
  }

  actulizar()
  {
    this.cargando = true;
    this.editarDatos = this.formulario.value;
    this.editarDatos["id"]=this.id;
    this.api.actulizar(this.editarDatos).subscribe({
     next:res=>{
       this.getplanSepare();
       this.formulario.reset();
       let cerrar = document.getElementById("cerrarDialogo");
       cerrar?.click();
       let mensaje = "El producto" + " "+ res.planSepare+ " " + "fue actualizado"
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
          'Upss, el estudiante con la iddentidad. :'+ this.editarDatos.planSepare + "no existe",
          //err.status+"" + err.statusText,
          'error'
        )
       }

     }
    });

  }

  eliminar(id:number){
    this.cargando = true;
    this.api.eliminar(id).subscribe({
     next:res=>{
       this.getplanSepare();
       let cerrar = document.getElementById("cerrarDialogo");
       cerrar?.click();
       let mensaje = "el producto" + " "+ res.planSepare+ " "  + "fue actualizado"
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
          'Upss, el estudiante con la iddentidad. :'+ this.editarDatos.planSepare + "no existe",
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
