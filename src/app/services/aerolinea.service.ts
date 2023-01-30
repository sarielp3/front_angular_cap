import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aerolinea } from '../models/aerolinea.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AerolineaService {

  constructor( private http: HttpClient ) { }

  getAerolineas(): Observable<Aerolinea[]>{
    return this.http.get<Aerolinea[]>( environment.apiUrl + 'aerolineas' );
  }
}
