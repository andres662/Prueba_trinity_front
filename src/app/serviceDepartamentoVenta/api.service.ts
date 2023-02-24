import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartamentoVenta } from '../InterfaceDepartamentoVenta/DepartamentoVenta.ts/DepartamentoVenta';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL="http://localhost:8080/tbl_departamentoVenta";
  constructor(private http: HttpClient) { }

  
  add(departamentoVenta: DepartamentoVenta):Observable<DepartamentoVenta>{
    return this.http.post<DepartamentoVenta>(this.URL, departamentoVenta)
  }

  guardar(departamentoVenta: any){
    return this.http.post<DepartamentoVenta>(this.URL, departamentoVenta)
  }

  listar(){
    return this.http.get<any>(this.URL);
  }
  actulizar(departamentoVenta:any){
    return this.http.post<any>(this.URL,departamentoVenta); 
  }
  eliminar(id:any){
    return this.http.delete<any>(this.URL+"/"+id); 
  }


}
