import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inventario } from '../InterfaceInventario/Inventario';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL="http://localhost:8080/tbl_inventario";
  constructor(private http: HttpClient) { }

  add(inventario: Inventario):Observable<Inventario>{
    return this.http.post<Inventario>(this.URL, inventario)
  }

  guardar(inventario: any){
    return this.http.post<Inventario>(this.URL, inventario)
  }

  listar(){
    return this.http.get<any>(this.URL);
  }
  actulizar(inventario:any){
    return this.http.post<any>(this.URL,inventario); 
  }
  eliminar(id:any){
    return this.http.delete<any>(this.URL+"/"+id); 
  }
}
