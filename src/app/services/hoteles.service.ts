import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hoteles } from 'src/app/models/Identity/hoteles';
import { Ciudades } from 'src/app/models/Identity/ciudades';

@Injectable({
  providedIn: 'root'
})
export class HotelesServiceTsService {

  constructor(private http: HttpClient) { }

  public getHoteles():Observable<Hoteles[]>{
    
    return this.http.get<Hoteles[]>('AgenciaViajeTD/hoteles');
  }

  public getCiudades():Observable<Ciudades[]>{
    
    return this.http.get<Ciudades[]>('AgenciaViajeTD/ciudades');
  }

  public getFiltrosHoteles(nomHotel:string = '',codHotel:string= '',ciudad:string= ''):Observable<Hoteles[]>{
    
    return this.http.get<Hoteles[]>('AgenciaViajeTD/hoteles/filtros?nomHotel='+ nomHotel +'&codHotel='+ codHotel +'&ciudad='+ciudad);
  }
}
