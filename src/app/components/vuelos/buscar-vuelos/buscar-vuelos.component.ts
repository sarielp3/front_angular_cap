import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { AltaVueloComponent } from '../alta-vuelo/alta-vuelo.component';

@Component({
  selector: 'app-buscar-vuelos',
  templateUrl: './buscar-vuelos.component.html',
  styleUrls: ['./buscar-vuelos.component.css']
})
export class BuscarVuelosComponent {
  constructor(public dialog: MatDialog){}

  altaReserva(){
    console.log('Clic en boton Alta');
    const dialogoRef = this.dialog.open(AltaVueloComponent,{
      disableClose: true ,     
    });
    dialogoRef.afterClosed().subscribe(result =>{
      console.log(result);
    });
  }
}
