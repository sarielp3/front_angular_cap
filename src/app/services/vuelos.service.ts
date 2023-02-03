import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vuelo } from '../models/vuelo.interface';
import { RespuestaString } from '../models/respuesta_string';
import { AltaVuelo } from '../models/alta-vuelo.interface';
import { environment } from 'src/environments/environment';
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
    return this.http.get<Vuelo[]>( environment.apiUrl + 'vuelos/' + filtros);
  }

  createVuelo(vuelo: AltaVuelo){
    return this.http.post<Vuelo>(environment.apiUrl+ 'vuelos/', vuelo);
  }

  updateVuelo(vuelo: AltaVuelo, idVuelo: number){
    return this.http.put<AltaVuelo>(environment.apiUrl + 'vuelos/' + idVuelo, vuelo);
  }

  deleteVuelo(idVuelo: number){
    return this.http.delete<RespuestaString>( environment.apiUrl + 'vuelos/' + idVuelo);
  }

  cambioEstatus(idVuelo: number){
    return this.http.put<RespuestaString>( environment.apiUrl + 'vuelos/cambiar-estado/' + idVuelo, null);
  }
}
