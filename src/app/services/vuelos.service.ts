import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vuelo } from '../models/vuelo.interface';

@Injectable({
  providedIn: 'root'
})
export class VuelosService {
  private apiUrl: string = 'http://localhost:8080/AgenciaViajeTD/vuelos';

  vuelos: Vuelo[] = [];
  emisor = new EventEmitter<Vuelo[]>();

  constructor( private http: HttpClient) { }

  getVuelos(filtros: string): Observable<Vuelo[]>{
    return this.http.get<Vuelo[]>( this.apiUrl + '/' + filtros);
  }
}
