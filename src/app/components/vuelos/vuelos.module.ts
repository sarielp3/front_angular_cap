import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaVuelosComponent } from './tabla-vuelos/tabla-vuelos.component';
import { BuscarVuelosComponent } from './buscar-vuelos/buscar-vuelos.component';
import { FiltrosVuelosComponent } from './filtros-vuelos/filtros-vuelos.component';



@NgModule({
  declarations: [
    TablaVuelosComponent,
    FiltrosVuelosComponent,
    BuscarVuelosComponent
  ],
  exports:[
    TablaVuelosComponent,
    FiltrosVuelosComponent,
    BuscarVuelosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VuelosModule { }
