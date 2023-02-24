import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientesComponent } from '../clientes/clientes.component';
import { Observable } from 'rxjs';
import { Clientes } from '../InterfaceClientes/Clientes';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL="http://localhost:8080/tbl_clientes";
  constructor(private http: HttpClient) { }

  add(clientes: Clientes):Observable<Clientes>{
    return this.http.post<Clientes>(this.URL, clientes)
  }

  guardar(clientes: any){
    return this.http.post<Clientes>(this.URL, clientes)
  }

  listar(){
    return this.http.get<any>(this.URL);
  }
  actulizar(clientes:any){
    return this.http.post<any>(this.URL,clientes); 
  }
  eliminar(id:any){
    return this.http.delete<any>(this.URL+"/"+id); 
  }
}
