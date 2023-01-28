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
      environment.apiUrl + 'cuartos/lista-cuartos/'
    );
  }

  registraHabitaciones(habitacion: Cuarto): Observable<Object> {
    return this.httpClient.post(
      environment.apiUrl + '/cuartos/agregar/81',
      habitacion
    );
  }

  eliminarHabitacion(idHotel: number): Observable<Object> {
    return this.httpClient.delete(
      environment.apiUrl + `cuartos/eliminar-cuarto/${idHotel}`
    );
  }
}
