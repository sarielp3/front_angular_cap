import { Component } from '@angular/core';
import { Vuelo } from '../../../models/vuelo.interface';
import { VuelosService } from '../../../services/vuelos.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {ModificaVueloComponent} from '../modifica-vuelo/modifica-vuelo.component'
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AltaVueloComponent } from '../alta-vuelo/alta-vuelo.component';

@Component({
  selector: 'app-tabla-vuelos',
  templateUrl: './tabla-vuelos.component.html',
  styleUrls: ['./tabla-vuelos.component.css']
})
export class TablaVuelosComponent {
  displayedColumns: string[] = ['Origen', 'Destino', 'Aerolinea', 'Estatus','Hora de llegada','Hora de salida','Codigo del vuelo','Modificar','Habilitar','Eliminar'];
  vuelos: Vuelo[] = [];
  refreshTabla: Subscription;
  dataSource = new MatTableDataSource<Vuelo>(this.vuelos);
  

  constructor( private vueloService: VuelosService,
    public dialog: MatDialog){
    this.refreshTabla = this.vueloService.emisor.subscribe(
      ( vuelos: Vuelo[] ) =>{
        this.vuelos = vuelos;
        this.dataSource = new MatTableDataSource<Vuelo>(this.vuelos);
        console.log('vuelos tabla ' + this.vuelos);
      }
    )
  }

  ngOnInit(): void {
    this.vueloService.getVuelos('')
        .subscribe( vuelos => {
          this.vuelos = vuelos;
          console.log(this.vuelos);
          this.dataSource = new MatTableDataSource<Vuelo>(this.vuelos);
        }, err => {
          console.log('Error en GET vuelos');
          console.info(err);
          this.vueloService.vuelos = [];
        });        
  }
  ngOnDestroy(): void {
    this.refreshTabla.unsubscribe();
  }

  modificar(elemento:Vuelo):void{
    console.log('Elemento =>', elemento);
    console.log('Clic en boton Modificar');
    const dialogoRef = this.dialog.open(ModificaVueloComponent,{
      data: elemento,
      disableClose: true ,     
    });
    dialogoRef.afterClosed().subscribe(result =>{
      console.log(result);
    });
  }

  eliminar(elemento:Vuelo):void{
    console.log('Clic en boton Eliminar', elemento);
    const dialogoRef = this.dialog.open(ConfirmDialogComponent,{
      disableClose:true,
      data:true
    });
    dialogoRef.afterClosed().subscribe(respuesta =>{
      console.log(respuesta);
      if(respuesta){
        console.log('Eliminamos Registro con Id',elemento.idVuelo );
      }
    })
  }

  altaReserva(){
    console.log('Clic en boton Alta');
    const dialogoRef = this.dialog.open(AltaVueloComponent,{
      disableClose: true ,     
    });
    dialogoRef.afterClosed().subscribe(result =>{
      console.log(result);
    });
  }

  onChange(enable: boolean,elemento : Vuelo){
    console.log(enable);
    const dialogoRef = this.dialog.open(ConfirmDialogComponent,{
      disableClose:true
    });
    dialogoRef.afterClosed().subscribe(respuesta =>{
      console.log(respuesta);
      if(respuesta){
        console.log('Se cambia valor');
      }else{
        if(enable){
          elemento.estatus = '0';
        }else{
          elemento.estatus = '1';
        }
      }
    })
  }
  
}
