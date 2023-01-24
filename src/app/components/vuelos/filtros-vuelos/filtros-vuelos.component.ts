import { Component } from '@angular/core';
import { Aerolinea } from '../../../models/aerolinea.interface';
import { Ciudad } from '../../../models/ciudad.interface';
import { AerolineaService } from 'src/app/services/aerolinea.service';
import { CiudadesService } from 'src/app/services/ciudades.service';



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
