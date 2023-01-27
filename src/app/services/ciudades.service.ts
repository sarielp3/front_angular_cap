import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ciudades } from '../models/Identity/ciudades';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class CiudadesService {
    constructor(private http: HttpClient) { }

    public getCiudadesOrigen():Observable<Ciudades[]>{
        return this.http.get<Ciudades[]>(environment.apiUrl + 'ciudades/origen');
    }

    public getCiudadesDestino():Observable<Ciudades[]>{
        return this.http.get<Ciudades[]>(environment.apiUrl + 'ciudades/destino');
    }
}