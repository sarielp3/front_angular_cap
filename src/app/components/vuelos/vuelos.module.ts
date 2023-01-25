import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaVuelosComponent } from './tabla-vuelos/tabla-vuelos.component';
import { BuscarVuelosComponent } from './buscar-vuelos/buscar-vuelos.component';
import { FiltrosVuelosComponent } from './filtros-vuelos/filtros-vuelos.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



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
    CommonModule,
    FormsModule,
    BrowserModule
  ]
})
export class VuelosModule { }
