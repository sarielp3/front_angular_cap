import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Ciudades } from 'src/app/models/Identity/ciudades';
import { CuartosReservas } from 'src/app/models/Identity/cuartosReservas';
import { HotelesReservas } from 'src/app/models/Identity/hotelesReservas';
import { Reservas } from 'src/app/models/Identity/reservas';
import { VuelosReservas } from 'src/app/models/Identity/vuelosReservas';
import { ReservasService } from 'src/app/services/reservas.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  titulo = 'Listado de Reservas';
  public reservas: Reservas[] = [];
  public hoteles: HotelesReservas[] = [];
  public cuartos: CuartosReservas[] = [];
  public vuelos: VuelosReservas[] = [];
  dataSource = new MatTableDataSource<Reservas>(this.reservas);
  constructor(private service: ReservasService) { };

  public ngOnInit(): void {
    this.getReservas();
    this.getHoteles();
    this.getCuartos();
    this.getVuelos();
  }
   public getReservas() {
    this.service.getReservas().subscribe(reservas => {
      this.reservas = reservas;
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
}