import { Component } from '@angular/core';
import { AerolineaService } from '../../services/aerolinea.service';
import { Aerolinea } from '../../interfaces/aerolinea.interface';
import { CiudadesService } from '../../services/ciudades.service';
import { Ciudad } from '../../interfaces/ciudad.interface';

@Component({
  selector: 'app-filtros-vuelos',
  templateUrl: './filtros-vuelos.component.html',
  styleUrls: ['./filtros-vuelos.component.css']
})
export class FiltrosVuelosComponent {

  aerolineas: Aerolinea[] = [];
  origenes: Ciudad[] = [];
  destinos: Ciudad[] = [];

  constructor(private aerolineaService: AerolineaService, private ciudadesService:CiudadesService){}

  getAerolineas(){
    this.aerolineaService.getAerolineas()
        .subscribe( aerolineas => {
          this.aerolineas = aerolineas;
        }, err =>{
          
        });
  }

  getOrigenes(){
    this.ciudadesService.getCiudades("origen")
        .subscribe( origenes =>{
          this.origenes = origenes;
        }, err => {
          console.log('Error');
          console.info(err);
          this.origenes = [];
        });
  }
  getDestinos(){
    this.ciudadesService.getCiudades("destino")
        .subscribe( destinos =>{
          this.destinos = destinos;
        }, err => {
          console.log('Error');
          console.info(err);
          this.destinos = [];
        });
  }

}
