import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Aerolinea } from '../../../models/aerolinea.interface';
import { Ciudad } from '../../../models/ciudad.interface';
import { AerolineaService } from 'src/app/services/aerolinea.service';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { VuelosService } from 'src/app/services/vuelos.service';
import { Vuelo } from '../../../models/vuelo.interface';



@Component({
  selector: 'app-filtros-vuelos',
  templateUrl: './filtros-vuelos.component.html',
  styleUrls: ['./filtros-vuelos.component.css']
})
export class FiltrosVuelosComponent {
  form: FormGroup;

  aerolineas: Aerolinea[] = [];
  origenes: Ciudad[] = [];
  destinos: Ciudad[] = [];
  vuelos: Vuelo[] = [];

  origenesSelect: any;
  destinosSelect: any;
  aerolineasSelect: any;

  filtrosBusqueda: string = '';

  origenControl = new FormControl(this.origenes[0].nombreCiudad);
  destinoControl = new FormControl(this.destinos[0].nombreCiudad);
  aerolineaControl = new FormControl(this.aerolineas[0].nombreAerolinea);

  constructor(private aerolineaService: AerolineaService, 
    private ciudadesService:CiudadesService, 
    private vueloService: VuelosService){
      this.form = new FormGroup({
        origen: this.origenControl,
        destino: this.destinoControl,
        aerolinea: this.aerolineaControl
      });
    }

  ngOnInit(){
    this.getAerolineas();
    this.getOrigenes();
    this.getDestinos();
  }
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

  filtros(){
    this.filtrosBusqueda = '?origen=' + this.origenesSelect + '&destino=' + this.destinosSelect + '&aerolinea=' + this.aerolineasSelect;
    console.log('Termino de busqueda ' + this.filtrosBusqueda);

    this.vueloService.getVuelos(this.filtrosBusqueda)
        .subscribe( vuelos => {
          this.vuelos  = vuelos;
          this.vueloService.emisor.next(this.vuelos);
        }, err => {
          console.log('Error en GET vuelos');
          console.info(err);
          this.vuelos  = [];
        })
    console.log(this.vuelos);
  }
}
