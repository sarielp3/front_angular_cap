import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaVuelosComponent } from './components/tabla-vuelos/tabla-vuelos.component';
import { FiltrosVuelosComponent } from './components/filtros-vuelos/filtros-vuelos.component';
import { BuscarVuelosComponent } from './pages/buscar-vuelos/buscar-vuelos.component';



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
