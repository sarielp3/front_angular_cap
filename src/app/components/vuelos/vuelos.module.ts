import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaVuelosComponent } from './tabla-vuelos/tabla-vuelos.component';
import { BuscarVuelosComponent } from './buscar-vuelos/buscar-vuelos.component';
import { FiltrosVuelosComponent } from './filtros-vuelos/filtros-vuelos.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { ActiveInactive } from 'src/app/shared/pipes/active.inactive';
import {MatSelectModule} from '@angular/material/select';
import { ModificaVueloComponent } from './modifica-vuelo/modifica-vuelo.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { AltaVueloComponent } from './alta-vuelo/alta-vuelo.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon'


@NgModule({
  declarations: [
    TablaVuelosComponent,
    FiltrosVuelosComponent,
    BuscarVuelosComponent,
    ActiveInactive,
    ModificaVueloComponent,
    AltaVueloComponent
    
  ],
  exports:[
    TablaVuelosComponent,
    FiltrosVuelosComponent,
    BuscarVuelosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    MatTableModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule
    
  ]
})
export class VuelosModule { }
