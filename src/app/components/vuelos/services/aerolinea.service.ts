import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aerolinea } from '../interfaces/aerolinea.interface';

@Injectable({
  providedIn: 'root'
})
export class AerolineaService {

  private apiUrl: string = 'http://localhost:8080/AgenciaViajeTD/aerolineas';

  constructor( private http: HttpClient ) { }

  getAerolineas(): Observable<Aerolinea[]>{
    return this.http.get<Aerolinea[]>( this.apiUrl );
  }
}
