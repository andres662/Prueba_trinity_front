import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanSepare } from '../InterfacePlanSepare/PlanSepare';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL="http://localhost:8080/tbl_planSepare";
  constructor(private http: HttpClient) {}

  add(planSepare: PlanSepare):Observable<PlanSepare>{
    return this.http.post<PlanSepare>(this.URL, planSepare)
  }

  guardar(planSepare: any){
    return this.http.post<PlanSepare>(this.URL, planSepare)
  }

  listar(){
    return this.http.get<any>(this.URL);
  }
  actulizar(planSepare:any){
    return this.http.post<any>(this.URL,planSepare); 
  }
  eliminar(id:any){
    return this.http.delete<any>(this.URL+"/"+id); 
  }
}
