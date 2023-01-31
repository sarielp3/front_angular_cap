import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hoteles } from 'src/app/models/Identity/hoteles';
import { Ciudades } from 'src/app/models/Identity/ciudades';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelesServiceTsService {

  constructor(private http: HttpClient) { }

  public getHoteles():Observable<Hoteles[]>{
    
    return this.http.get<Hoteles[]>(environment.apiUrl + 'hoteles');
  }

  public getCiudades():Observable<Ciudades[]>{
    
    return this.http.get<Ciudades[]>('http://127.0.0.1:8080/AgenciaViajeTD/ciudades');
  }

  public getFiltrosHoteles(nomHotel:string = '',codHotel:string= '',ciudad:string= ''):Observable<Hoteles[]>{
    
    return this.http.get<Hoteles[]>('http://127.0.0.1:8080/AgenciaViajeTD/hoteles/filtros?nomHotel='+ nomHotel +'&codHotel='+ codHotel +'&ciudad='+ciudad);
  }

  public altaHotel(hotel:Hoteles):Observable<Hoteles>{
    return this.http.post<Hoteles>('http://127.0.0.1:8080/AgenciaViajeTD/hoteles/nuevo-hotel',hotel);
  }

  public modificar(id:any,hotel:Hoteles):Observable<Hoteles>{
    return this.http.put<Hoteles>('http://127.0.0.1:8080/AgenciaViajeTD/hoteles/update-hotel/' +id,hotel);
  }

  public eliminar(id:any):Observable<Hoteles>{
    return this.http.delete<Hoteles>('http://127.0.0.1:8080/AgenciaViajeTD/hoteles/delete-hotel/' +id);
  }

  public cambiarEstatus(id:any):Observable<Hoteles>{
    return this.http.put<Hoteles>('http://127.0.0.1:8080/AgenciaViajeTD/hoteles/cambiar-estatus-hotel/' + id,null);
  }
}
