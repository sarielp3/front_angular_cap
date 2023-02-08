import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cuarto } from '../models/cuarto';
import { environment } from 'src/environments/environment';
import { RespuestaString } from '../models/respuesta_string';

@Injectable({
  providedIn: 'root',
})
export class CuartoService {
  constructor(private httpClient: HttpClient) {}

  obtenerListaDeHabitaciones(): Observable<Cuarto[]> {
    return this.httpClient.get<Cuarto[]>(
      environment.apiUrl + 'cuartos/lista-cuartos/'
    );
  }

  obtenerListaFiltro(id: number): Observable<Cuarto[]> {
    return this.httpClient.get<Cuarto[]>(
      environment.apiUrl + 'cuartos/filter-cuartos/' + id
    );
  }

  registraHabitaciones(habitacion: Cuarto, id: number): Observable<Object> {
    return this.httpClient.post(
      environment.apiUrl + 'cuartos/agregar/' + id,
      habitacion
    );
  }

  modificarHabitaciones(
    habitacion: Cuarto,
    idCuarto: number
  ): Observable<Object> {
    return this.httpClient.put(
      environment.apiUrl + `cuartos/modificar/${idCuarto}`,
      habitacion
    );
  }

  eliminarHabitacion(idHotel: number) {
    return this.httpClient.delete<RespuestaString>(
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
