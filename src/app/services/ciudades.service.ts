import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ciudad } from '../models/ciudad.interface';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {
  private apiUrl: string = 'http://localhost:8080/AgenciaViajeTD/ciudades';

  constructor( private http: HttpClient ) { }

  getCiudades(param: string): Observable<Ciudad[]>{
    return this.http.get<Ciudad[]>( this.apiUrl+"/"+param);
  }
}
