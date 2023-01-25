import { Component } from '@angular/core';
import { Vuelo } from '../../../models/vuelo.interface';
import { VuelosService } from '../../../services/vuelos.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-tabla-vuelos',
  templateUrl: './tabla-vuelos.component.html',
  styleUrls: ['./tabla-vuelos.component.css']
})
export class TablaVuelosComponent {
  vuelos: Vuelo[] = [];
  refreshTabla: Subscription;

  constructor( private vueloService: VuelosService){
    this.refreshTabla = this.vueloService.emisor.subscribe(
      ( vuelos ) =>{
        this.vuelos = vuelos;
      }
    )
  }

  ngOnInit(): void {
    this.vueloService.getVuelos('')
        .subscribe( vuelos => {
          this.vuelos = vuelos;
        }, err => {
          console.log('Error en GET vuelos');
          console.info(err);
          this.vueloService.vuelos = [];
        });
        //this.vuelos = this.vueloService.vuelos;
        console.log(this.vuelos);
  }
  ngOnDestroy(): void {
    this.refreshTabla.unsubscribe();
  }
  
}
