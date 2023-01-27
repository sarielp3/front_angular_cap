import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservas } from '../models/Identity/reservas';
import { Observable} from 'rxjs';
import { HotelesReservas } from '../models/Identity/hotelesReservas';
import { CuartosReservas } from '../models/Identity/cuartosReservas';
import { VuelosReservas } from '../models/Identity/vuelosReservas';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  constructor(private http: HttpClient) { }

  public getReservas(): Observable<Reservas[]>{
    return this.http.get<Reservas[]>(environment.apiUrl +'reservas');
  }

  public getHotel(): Observable<HotelesReservas[]>{
    return this.http.get<HotelesReservas[]>('AgenciaViajeTD/hoteles');
  }

  public getCuarto(): Observable<CuartosReservas[]>{
    return this.http.get<CuartosReservas[]>('AgenciaViajeTD/cuartos');
  }

  public getVuelo(): Observable<VuelosReservas[]>{
    return this.http.get<VuelosReservas[]>('AgenciaViajeTD/vuelos');
  }
}
