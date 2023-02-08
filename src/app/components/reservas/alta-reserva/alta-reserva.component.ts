import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ciudades } from 'src/app/models/Identity/ciudades';
import { CiudadesService } from 'src/app/services/ciudades.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { VuelosService } from 'src/app/services/vuelos.service';
import { HotelesServiceTsService } from 'src/app/services/hoteles.service';
import { Vuelo } from 'src/app/models/vuelo.interface';
import { Hoteles } from 'src/app/models/Identity/hoteles';
import { Cuarto } from 'src/app/models/cuarto';
import { CuartoService } from 'src/app/services/cuarto.service';
import { AltaReserva } from 'src/app/models/Identity/altaReserva';
import { ReservasService } from 'src/app/services/reservas.service';
import { Reservas } from 'src/app/models/Identity/reservas';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-alta-reserva',
  templateUrl: './alta-reserva.component.html',
  styleUrls: ['./alta-reserva.component.css'],
})
export class AltaReservaComponent implements OnInit {
  altaReserva: FormGroup;
  minDate = new Date(2020, 0, 1);
  maxDate = new Date(2022, 11, 31);

  ciudadesOrigen: Ciudades[];
  ciudadesDestino: Ciudades[];
  vuelos: Vuelo[];
  hoteles: Hoteles[];
  cuartos: Cuarto[];
  reservaAlta: AltaReserva = new AltaReserva();

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservasService,
    private ciudadesService: CiudadesService,
    private vuelosService: VuelosService,
    private hotelesServices: HotelesServiceTsService,
    private cuartosService: CuartoService,
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<AltaReservaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.altaReserva = this.fb.group({
      origenSelect: ['', Validators.required],
      nombreSelect: ['', Validators.required],
      apellidoPaternoSelect: ['', Validators.required],
      apellidoMaternoSelect: ['', Validators.required],
      cuartoSelect: ['', Validators.required],
      destinoSelect: ['', Validators.required],
      vueloSelect: ['', Validators.required],
      hotelSelect: ['', Validators.required],
      costoCuarto: ['', Validators.required],
      fechaInicioSelect: ['', Validators.required],
      fechaFinSelect: ['', Validators.required],
      descripcionSelect: ['', Validators.required],
    });
    this.ciudadesService.getCiudadesOrigen().subscribe(
      (data) => {
        console.log('Data =>', data);
        this.ciudadesOrigen = data;
      },
      (error) => {
        console.log('Error =>', error);
      }
    );
    this.ciudadesService.getCiudadesDestino().subscribe(
      (data) => {
        console.log('Data =>', data);
        this.ciudadesDestino = data;
      },
      (error) => {
        console.log('Error =>', error);
      }
    );
    /*   this.vuelosService.getVuelos('').subscribe(
         vuelo => {
           console.log("Data =>", vuelo);
           this.vuelos = vuelo;
         }, error => {
           console.log("Error =>", error);
         });
    this.hotelesServices.getHoteles().subscribe(
      hotel => {
        console.log("Data =>", hotel);
        this.hoteles = hotel;
      }, error => {
        console.log("Error =>", error);
      });*/
    this.cuartosService.obtenerListaDeHabitaciones().subscribe(
      (cuarto) => {
        console.log('Data =>', cuarto);
        this.cuartos = cuarto;
      },
      (error) => {
        console.log('Error =>', error);
      }
    );
    this.altaReserva.get('vueloSelect').disable();
    this.altaReserva.get('hotelSelect').disable();
    this.altaReserva.get('cuartoSelect').disable();
    this.altaReserva.get('costoCuarto').disable();
  }

  guardar() {
    this.reservaAlta.nombreCliente =
      this.altaReserva.controls['nombreSelect'].value;
    this.reservaAlta.apellidoPaternoCliente =
      this.altaReserva.controls['apellidoPaternoSelect'].value;
    this.reservaAlta.apellidoMaternoCliente =
      this.altaReserva.controls['apellidoMaternoSelect'].value;
    this.reservaAlta.fechaInicio =
      this.altaReserva.controls['fechaInicioSelect'].value;
    this.reservaAlta.fechaFin =
      this.altaReserva.controls['fechaFinSelect'].value;
    this.reservaAlta.idVuelo = this.altaReserva.controls['vueloSelect'].value;
    this.reservaAlta.idHotel = this.altaReserva.controls['hotelSelect'].value;
    this.reservaAlta.idCuarto = this.altaReserva.controls['cuartoSelect'].value;
    this.reservaAlta.descripcion =
      this.altaReserva.controls['descripcionSelect'].value;

    this.reservaAlta.fechaInicio.setHours(18);
    this.reservaAlta.fechaFin.setHours(12);
    if (this.altaReserva.valid === true) {
      this.reservaService.createReserva(this.reservaAlta).subscribe(
        (data) => {
          this.reservaAlta.idReserva = data.idReserva;
          this.snackBarService.openSnackBar(
            'Éxito',
            'La reserva fue creada exitosamente',
            'Éxito'
          );
          this.dialogRef.close();
        },
        (error) => {}
      );
    } else {
      this.snackBarService.openSnackBar(
        'error',
        'El formulario no es válido',
        'error'
      );
    }
  }
  cancelar() {
    this.dialogRef.close();
  }

  origenChange() {
    this.altaReserva.get('vueloSelect').enable();
    const origenId = this.altaReserva.getRawValue().origenSelect;
    const destinoId = this.altaReserva.getRawValue().destinoSelect;
    console.log(origenId); // Llamamos a cargar Destino
    let ciudadesDestinoAux = [];
    let vuelosAuxiliar = [];
    let ciudadesId = [];
    this.vuelosService.getVuelos('?origen=' + origenId).subscribe(
      (respuesta) => {
        const vuelos = respuesta;
        vuelos.forEach((vuelo) => {
          if (!ciudadesId.includes(vuelo.destino.idCiudad)) {
            ciudadesId.push(vuelo.destino.idCiudad);
            ciudadesDestinoAux.push(vuelo.destino);
          }
          vuelosAuxiliar.push({
            idVuelo: vuelo.idVuelo,
            codigoVuelo: vuelo.codigoVuelo,
          });
        });
        console.log(ciudadesDestinoAux);
        console.log(vuelosAuxiliar);
        this.ciudadesDestino = ciudadesDestinoAux;
        this.vuelos = vuelosAuxiliar;
      },
      (error) => {}
    );
  }

  destinoChange() {
    this.altaReserva.get('hotelSelect').enable();
    this.altaReserva.get('vueloSelect').enable();
    const destinoId = this.altaReserva.getRawValue().destinoSelect;
    const origenId = this.altaReserva.getRawValue().origenSelect;
    let ciudadesOrigenAux = [];
    let vuelosAuxiliar = [];
    let ciudadesId = [];
    this.vuelosService.getVuelos('?destino=' + destinoId).subscribe(
      (respuesta) => {
        const vuelos = respuesta;
        vuelos.forEach((vuelo) => {
          if (!ciudadesId.includes(vuelo.origen.idCiudad)) {
            ciudadesId.push(vuelo.origen.idCiudad);
            ciudadesOrigenAux.push(vuelo.origen);
            this.altaReserva.controls['origenSelect'].setValue(ciudadesId[0]);
          }
          vuelosAuxiliar.push({
            idVuelo: vuelo.idVuelo,
            codigoVuelo: vuelo.codigoVuelo,
          });
        });
        console.log(ciudadesOrigenAux);
        console.log(vuelosAuxiliar);
        //this.ciudadesOrigen = ciudadesOrigenAux;
        this.vuelos = vuelosAuxiliar;
      },
      (error) => {}
    );
    let hotelesAux = [];
    if (destinoId != '') {
      this.hotelesServices
        .getFiltrosHoteles('', '', destinoId)
        .subscribe((respuesta) => {
          const hoteles = respuesta;
          hoteles.forEach((hotel) => {
            hotelesAux.push({
              idHotel: hotel.idHotel,
              nombreHotel: hotel.nombreHotel,
            });
          });
          this.hoteles = hotelesAux;
        });
    }
  }

  vueloChange() {
    this.altaReserva.get('hotelSelect').enable();
  }

  hotelChange() {
    this.altaReserva.get('cuartoSelect').enable();
    const hotelId = this.altaReserva.getRawValue().hotelSelect;
    let cuartosAuxiliar = [];
    this.cuartosService.obtenerListaFiltro(hotelId).subscribe(
      (respuesta) => {
        const cuartos = respuesta;
        cuartos.forEach((cuarto) => {
          cuartosAuxiliar.push({
            idCuarto: cuarto.idCuarto,
            tipoCuarto: cuarto.tipoCuarto,
            costoNoche: cuarto.costoNoche,
          });
        });

        console.log(cuartosAuxiliar);
        this.cuartos = cuartosAuxiliar;
        if (this.cuartos.length === 0) {
          this.snackBarService.openSnackBar(
            'error',
            'Este Hotel no cuenta con cuartos',
            'error'
          );
        }
      },
      (error) => {}
    );
  }

  cuartoChange() {
    const cuartoId = this.altaReserva.getRawValue().cuartoSelect;
    console.log('cuarto: ' + this.altaReserva.controls['cuartoSelect'].value);
    const cuarto = this.cuartos.filter(
      (cuarto) => cuarto.idCuarto === cuartoId
    );
    if (cuarto.length > 0) {
      console.log(cuarto);
      this.altaReserva.controls['costoCuarto'].setValue(cuarto[0].costoNoche);
    }
  }
}
