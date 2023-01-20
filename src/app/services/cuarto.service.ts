import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cuarto } from '../models/cuarto';

@Injectable({
  providedIn: 'root'
})
export class CuartoService {
  //URL que obtine el dato de un solo cuarto
  private baseURL = "http://localhost:8080/AgenciaViajeTD/cuartos/filter-cuartos/1";

  constructor(private httpClient : HttpClient) { }

  obtenerListaDeHabitaciones(): Observable<Cuarto[]>{
    return this.httpClient.get<Cuarto[]>(`${this.baseURL}`);
  }
}
