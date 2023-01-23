import { Component } from '@angular/core';
import { AerolineaService } from '../../services/aerolinea.service';
import { Aerolinea } from '../../interfaces/aerolinea.interface';

@Component({
  selector: 'app-filtros-vuelos',
  templateUrl: './filtros-vuelos.component.html',
  styleUrls: ['./filtros-vuelos.component.css']
})
export class FiltrosVuelosComponent {

  aerolineas: Aerolinea[] = [];

  constructor(private aerolineaService: AerolineaService){}

  getAerolineas1(){
    this.aerolineaService.getAerolineas()
        .subscribe( (aerolineas) => {
          this.aerolineas = aerolineas;
          console.log(aerolineas);
        }, (err) =>{
          console.log('Error');
          console.info(err);
          this.aerolineas = [];
        });
  }

}
