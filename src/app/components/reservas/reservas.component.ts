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
    });
    //this.getHoteles();
    //this.getCuartos();
    //this.getVuelos();
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
}