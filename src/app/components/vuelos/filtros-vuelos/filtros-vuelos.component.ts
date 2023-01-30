import { Component} from '@angular/core';
import { Aerolinea } from '../../../models/aerolinea.interface';
import { AerolineaService } from 'src/app/services/aerolinea.service';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { VuelosService } from 'src/app/services/vuelos.service';
import { Vuelo } from '../../../models/vuelo.interface';
import { Ciudades } from 'src/app/models/Identity/ciudades';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-filtros-vuelos',
  templateUrl: './filtros-vuelos.component.html',
  styleUrls: ['./filtros-vuelos.component.css']
})

export class FiltrosVuelosComponent {
  form: FormGroup;

  aerolineas: Aerolinea[] = [];
  origenes: Ciudades[] = [];
  destinos: Ciudades[] = [];
  vuelos: Vuelo[] = [];

  filtrosBusqueda: string = '';

  
  origenControl = new FormControl('');
  destinoControl = new FormControl('');
  aerolineaControl = new FormControl('');

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
      
    this.filtrosBusqueda = '?origen=' 
    + this.origenControl.value 
    + '&destino=' 
    + this.destinoControl.value 
    + '&aerolinea=' + this.aerolineaControl.value;
    
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
  }

  limpiarFiltros(){
    this.origenControl.setValue('');
    this.destinoControl.setValue('');
    this.aerolineaControl.setValue('');
    this.filtros();
  }
}
