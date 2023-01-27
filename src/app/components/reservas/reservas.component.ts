import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Ciudades } from 'src/app/models/Identity/ciudades';
import { CuartosReservas } from 'src/app/models/Identity/cuartosReservas';
import { HotelesReservas } from 'src/app/models/Identity/hotelesReservas';
import { Reservas } from 'src/app/models/Identity/reservas';
import { VuelosReservas } from 'src/app/models/Identity/vuelosReservas';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { FormControl } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { AltaReservaComponent } from './alta-reserva/alta-reserva.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ModificaReservaComponent } from './modifica-reserva/modifica-reserva.component';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  displayedColumns: string[] = ['Origen', 'Destino', 'Nombre del Cliente', 'Descripción de la reserva','Fecha Creacion','Modificar','Eliminar'];
  titulo = 'Listado de Reservas';
  public reservas: Reservas[] = [];
  public hoteles: HotelesReservas[] = [];
  public cuartos: CuartosReservas[] = [];
  public vuelos: VuelosReservas[] = [];
  dataSource = new MatTableDataSource<Reservas>(this.reservas);

  ciudadesOrigen : Ciudades[];
  selectedCiudadOrigen = new FormControl();
  loading: boolean = true;
  value = 0;
  mode = 'indeterminate';

  constructor(private service: ReservasService,
              private ciudadesService : CiudadesService,
              public dialog: MatDialog) { };

  public ngOnInit(): void {    
    this.ciudadesService.getCiudadesOrigen().subscribe(
      data => {
        console.log("Data =>",data);
        this.ciudadesOrigen = data;
      },error => {
        console.log("Error =>",error);
      }
    )
    this.service.getReservas().subscribe(reservas => {
      console.log(reservas);
      this.reservas = reservas;
      this.dataSource = new MatTableDataSource<Reservas>(this.reservas);
      this.loading = false;
    });  
  }
  
   public getHoteles() {
    this.service.getHotel().subscribe(hoteles => {
      this.hoteles = hoteles;
    });

  }

  public getCuartos() {
    this.service.getCuarto().subscribe(cuartos => {
      this.cuartos = cuartos;
    });

  }

  public getVuelos() {
    this.service.getVuelo().subscribe(vuelos => {
      this.vuelos = vuelos;
    });
  }

  buscar(){
    console.log(this.selectedCiudadOrigen.value);
  }

  modificar(elemento){
    console.log('Elemento =>', elemento);
    console.log('Clic en boton Alta');
    const dialogoRef = this.dialog.open(ModificaReservaComponent,{
      data: elemento,
      disableClose: true ,     
    });
    dialogoRef.afterClosed().subscribe(result =>{
      console.log(result);
    });
  }
  
  altaReserva(){
    console.log('Clic en boton Alta');
    const dialogoRef = this.dialog.open(AltaReservaComponent,{
      disableClose: true ,     
    });
    dialogoRef.afterClosed().subscribe(result =>{
      console.log(result);
    });

  }

  eliminar(elemento:Reservas){
    console.log('Clic en boton Eliminar', elemento);
    const dialogoRef = this.dialog.open(ConfirmDialogComponent,{
      disableClose:true
    });
    dialogoRef.afterClosed().subscribe(respuesta =>{
      console.log(respuesta);
      if(respuesta){
        console.log('Eliminamos Registro con Id',elemento.idReserva );
      }
    })
  }
}