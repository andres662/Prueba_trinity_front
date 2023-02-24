import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productos } from '../Interface/Productos';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL="http://localhost:8080/tbl_productos";
  constructor(private http: HttpClient) { }

  add(productos: Productos):Observable<Productos>{
    return this.http.post<Productos>(this.URL, productos)
  }

  guardar(productos: any){
    return this.http.post<Productos>(this.URL, productos)
  }

  listar(){
    return this.http.get<any>(this.URL);
  }
  actulizar(producto:any){
    return this.http.post<any>(this.URL,producto); 
  }
  eliminar(id:any){
    return this.http.delete<any>(this.URL+"/"+id); 
  }
}
