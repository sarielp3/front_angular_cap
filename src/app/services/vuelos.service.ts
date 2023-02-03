import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vuelo } from '../models/vuelo.interface';
import { RespuestaString } from '../models/respuesta_string';
import { AltaVuelo } from '../models/alta-vuelo.interface';

@Injectable({
  providedIn: 'root'
})
export class VuelosService {
  public spiner: boolean = false;
  private apiUrl: string = 'https://capbasanapptdd01.azurewebsites.net/AgenciaViajeTD/vuelos';

  vuelos: Vuelo[] = [];
  emisor = new EventEmitter<Vuelo[]>();
  spinerEmmisor = new EventEmitter<boolean>();

  constructor( private http: HttpClient) { }

  getVuelos(filtros: string): Observable<Vuelo[]>{
    return this.http.get<Vuelo[]>( this.apiUrl + '/' + filtros);
  }

  createVuelo(vuelo: AltaVuelo){
    return this.http.post<Vuelo>(this.apiUrl, vuelo);
  }

  updateVuelo(vuelo: AltaVuelo, idVuelo: number){
    return this.http.put<AltaVuelo>(this.apiUrl + '/' + idVuelo, vuelo);
  }

  deleteVuelo(idVuelo: number){
    return this.http.delete<RespuestaString>( this.apiUrl + '/' + idVuelo);
  }

  cambioEstatus(idVuelo: number){
    return this.http.put<RespuestaString>( this.apiUrl + '/cambiar-estado/' + idVuelo, null);
  }
}
