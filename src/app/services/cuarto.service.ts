import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cuarto } from '../models/cuarto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CuartoService {
  constructor(private httpClient: HttpClient) {}

  obtenerListaDeHabitaciones(): Observable<Cuarto[]> {
    return this.httpClient.get<Cuarto[]>(
      'http://localhost:8080/AgenciaViajeTD/cuartos/lista-cuartos/'
    );
  }

  registraHabitaciones(habitacion: Cuarto): Observable<Object> {
    return this.httpClient.post(
      environment.apiUrl + '/cuartos/agregar/81',
      habitacion
    );
  }

  modificarHabitaciones(
    habitacion: Cuarto,
    idCuarto: number
  ): Observable<Object> {
    return this.httpClient.put(
      environment.apiUrl + `/cuartos/modificar/${idCuarto}`,
      habitacion
    );
  }

  eliminarHabitacion(idHotel: number): Observable<Object> {
    return this.httpClient.delete(
      environment.apiUrl + `cuartos/eliminar-cuarto/${idHotel}`
    );
  }

  estatusHabitacion(idCuarto: number): Observable<Object> {
    return this.httpClient.post(
      environment.apiUrl + `cuartos/status-cuarto/${idCuarto}`,
      null
    );
  }
}
