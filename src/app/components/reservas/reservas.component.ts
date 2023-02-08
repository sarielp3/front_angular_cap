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
import { MatDialog } from '@angular/material/dialog';
import { AltaReservaComponent } from './alta-reserva/alta-reserva.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ModificaReservaComponent } from './modifica-reserva/modifica-reserva.component';
import { AerolineaService } from 'src/app/services/aerolinea.service';
import { Aerolineas } from 'src/app/models/Identity/aerolineasReservas';
import { Hoteles } from 'src/app/models/Identity/hoteles';
import { HotelesServiceTsService } from 'src/app/services/hoteles.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  loading:boolean = false;
  displayedColumns: string[] = ['Origen', 'Destino', 'Nombre del Cliente', 'Descripción de la reserva', 'Fecha Creacion', 'Modificar', 'Eliminar'];
  titulo = 'Administración de Reservas';
  public reservas: Reservas[] = [];
  public hoteles: HotelesReservas[] = [];
  public cuartos: CuartosReservas[] = [];
  public vuelos: VuelosReservas[] = [];
  dataSource = new MatTableDataSource<Reservas>(this.reservas);

  ciudadesOrigen: Ciudades[];
  ciudadesDestino: Ciudades[];
  aerolinea: Aerolineas[];
  hotel: Hoteles[];
  selectedCiudadOrigen = new FormControl();
  selectedCiudadDestino = new FormControl();
  selectedAerolinea = new FormControl();
  selectedHotel = new FormControl();
  selectedReserva = new FormControl();  
  value = 0;
  mode = 'indeterminate';

  constructor(private service: ReservasService,
    private ciudadesService: CiudadesService,
    private aerolineaService: AerolineaService,
    private hotelesService: HotelesServiceTsService,
    private reservaService: ReservasService,
    public dialog: MatDialog,
    public snackbar : SnackBarService) { };

  public ngOnInit(): void {
    this.loading = true;
    this.hotelesService.getHoteles().subscribe(
      data => {
        console.log("Data =>", data);
        this.hotel = data;
      }, error => {
        console.log("Error =>", error);
      }
    )
    this.ciudadesService.getCiudadesOrigen().subscribe(
      data => {
        console.log("Data =>", data);
        this.ciudadesOrigen = data;
      }, error => {
        console.log("Error =>", error);
      }
    )
    this.ciudadesService.getCiudadesDestino().subscribe(
      data => {
        console.log("Data =>", data);
        this.ciudadesDestino = data;
      }, error => {
        console.log("Error =>", error);
      }
    )
    this.aerolineaService.getAerolineas().subscribe(
      data => {
        console.log("Data =>", data);
        this.aerolinea = data;
      }, error => {
        console.log("Error =>", error);
      }
    )
    this.service.getReservas().subscribe(reservas => {
      console.log(reservas);
      this.reservas = reservas;
      this.dataSource = new MatTableDataSource<Reservas>(this.reservas);
      this.loading = false;
    },(error) => {
      this.loading = false;
      console.log(error);
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

  buscar() {
    this.loading = true;
    console.log(this.selectedCiudadOrigen.value);
    console.log(this.selectedCiudadDestino.value);
    console.log(this.selectedAerolinea.value);
    console.log(this.selectedHotel.value);
    let idOrigen = this.selectedCiudadOrigen.value;
    let idDestino = this.selectedCiudadDestino.value;
    let idAerolinea = this.selectedAerolinea.value;
    let idHotel = this.selectedHotel.value;
    if (!idOrigen) {
      idOrigen = '';
    }
    if (!idDestino) {
      idDestino = '';
    }
    if (!idAerolinea) {
      idAerolinea = '';
    }
    if (!idHotel) {
      idHotel = '';
    }
    this.service.getReservasByFiltro(idOrigen, idDestino, idAerolinea, idHotel).subscribe(reservas => {
      console.log(reservas);
      this.reservas = reservas;
      this.dataSource = new MatTableDataSource<Reservas>(this.reservas);
      this.loading = false;
    }, error => {
      console.log("Error =>", error);
      this.reservas = [];
      this.dataSource = new MatTableDataSource<Reservas>(this.reservas);
      this.loading = false;
    }
    );
  }

  modificar(elemento) {
    console.log('Elemento =>', elemento);
    console.log('Clic en boton Modificar');
    const dialogoRef = this.dialog.open(ModificaReservaComponent, {
      data: elemento,
      disableClose: true,
    });
    dialogoRef.afterClosed().subscribe(result => {
      console.log(result);
      this.reservaService.getReservas().subscribe(data=>{
        this.reservas = data;
        this.dataSource = new MatTableDataSource<Reservas>(this.reservas);
      })
    });
  }

  altaReserva() {
    console.log('Clic en boton Alta');
    const dialogoRef = this.dialog.open(AltaReservaComponent, {
      disableClose: true,
    });
    dialogoRef.afterClosed().subscribe(result => {
      console.log(result);
      this.reservaService.getReservas().subscribe(data=>{
        this.reservas = data;
        this.dataSource = new MatTableDataSource<Reservas>(this.reservas);
      })
      
    });

  }

  eliminar(elemento: Reservas): void {
    console.log('Clic en boton Eliminar', elemento);
    const dialogoRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true
    });
    dialogoRef.afterClosed().subscribe(respuesta => {
      console.log(respuesta);
      if (respuesta) {
        console.log('Eliminamos Registro con Id', elemento.idReserva);
        this.service.deleteReserva(elemento.idReserva).subscribe(reservas => {
          this.service.getReservas().subscribe(data => {
            console.log(data);
            this.reservas = data;
            this.dataSource = new MatTableDataSource<Reservas>(this.reservas);
            this.snackbar.openSnackBar('success','El registro se ha eliminado con exito','Eliminacion exitosa');
          })
        })
      }
    })
  }

  limpiarFiltros(){
    this.selectedCiudadOrigen.setValue('');
    this.selectedCiudadDestino.setValue('');
    this.selectedAerolinea.setValue('');
    this.selectedHotel.setValue('');
    this.buscar();
  }
}