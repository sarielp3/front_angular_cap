import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservas } from '../models/Identity/reservas';
import { Observable} from 'rxjs';
import { HotelesReservas } from '../models/Identity/hotelesReservas';
import { CuartosReservas } from '../models/Identity/cuartosReservas';
import { VuelosReservas } from '../models/Identity/vuelosReservas';
import { environment } from 'src/environments/environment';
import { AltaReserva } from '../models/Identity/altaReserva';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  constructor(private http: HttpClient) { }

  public getReservas(): Observable<Reservas[]>{
    return this.http.get<Reservas[]>(environment.apiUrl +'reservas');
  }

  public getReservasByFiltro(ciudadOrigenId:number,
    ciudadDestinoId:number,
    aerolineaId:number,
    hotelId:number): Observable<Reservas[]>{
      return this.http.get<Reservas[]>(environment.apiUrl + 'reservas?origen=' +ciudadOrigenId +'&destino=' + ciudadDestinoId + '&aerolinea=' + aerolineaId +'&hotel=' + hotelId)
    }

    createReserva(reserva: AltaReserva){
      return this.http.post<AltaReserva>(environment.apiUrl + 'reservas/creart', reserva);
    }

    public updateReserva(idReserva:number, reserva: AltaReserva){
      return this.http.put<AltaReserva>(environment.apiUrl + 'reservas/actualizar/' + idReserva, reserva)
    }
    public deleteReserva(idReserva:number): Observable<void>{
      return this.http.delete<void>(environment.apiUrl + 'reservas/eliminar/' + idReserva)
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
