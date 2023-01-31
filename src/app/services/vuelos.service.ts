import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vuelo } from '../models/vuelo.interface';
import { RespuestaString } from '../models/respuesta_string';

@Injectable({
  providedIn: 'root'
})
export class VuelosService {
  private apiUrl: string = 'https://capbasanapptdd01.azurewebsites.net/AgenciaViajeTD/vuelos';

  vuelos: Vuelo[] = [];
  emisor = new EventEmitter<Vuelo[]>();

  constructor( private http: HttpClient) { }

  getVuelos(filtros: string): Observable<Vuelo[]>{
    return this.http.get<Vuelo[]>( this.apiUrl + '/' + filtros);
  }


  deleteVuelo(idVuelo: number){
    return this.http.delete<RespuestaString>( this.apiUrl + '/' + idVuelo);
  }

  cambioEstatus(idVuelo: number){
    return this.http.put<RespuestaString>( this.apiUrl + '/cambiar-estado/' + idVuelo, null);
  }
}
