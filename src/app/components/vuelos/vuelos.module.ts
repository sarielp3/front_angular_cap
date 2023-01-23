import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaVuelosComponent } from './components/tabla-vuelos/tabla-vuelos.component';
import { FiltrosVuelosComponent } from './components/filtros-vuelos/filtros-vuelos.component';



@NgModule({
  declarations: [
    TablaVuelosComponent,
    FiltrosVuelosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VuelosModule { }
