import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cuarto } from 'src/app/models/cuarto';
import { AltaReserva } from 'src/app/models/Identity/altaReserva';
import { Ciudades } from 'src/app/models/Identity/ciudades';
import { Hoteles } from 'src/app/models/Identity/hoteles';
import { Reservas } from 'src/app/models/Identity/reservas';
import { Vuelo } from 'src/app/models/vuelo.interface';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { CuartoService } from 'src/app/services/cuarto.service';
import { HotelesServiceTsService } from 'src/app/services/hoteles.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { VuelosService } from 'src/app/services/vuelos.service';

@Component({
  selector: 'app-modifica-reserva',
  templateUrl: './modifica-reserva.component.html',
  styleUrls: ['./modifica-reserva.component.css'],
})
export class ModificaReservaComponent implements OnInit {
  today = new Date();

  minDate = new Date(
    this.today.getFullYear(),
    this.today.getMonth(),
    this.today.getDate()
  );

  maxDate = new Date(this.minDate.getFullYear() + 2, 11, 31);
  modificacionReserva: FormGroup;
  ciudadesOrigen: Ciudades[];
  ciudadesDestino: Ciudades[];
  vuelos: Vuelo[];
  hoteles: Hoteles[];
  cuartos: Cuarto[];
  reservaModificacion: AltaReserva = new AltaReserva();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Reservas,
    public dialogRef: MatDialogRef<ModificaReservaComponent>,
    private fb: FormBuilder,
    private ciudadesService: CiudadesService,
    private vueloService: VuelosService,
    private hotelService: HotelesServiceTsService,
    private cuartoService: CuartoService,
    private reservaService: ReservasService,
    private snackBarService: SnackBarService
  ) {
    this.modificacionReserva = this.fb.group({
      origenSelect: ['', Validators.required],
      destinoSelect: ['', Validators.required],
      vueloSelect: ['', Validators.required],
      hotelSelect: ['', Validators.required],
      cuartoSelect: ['', [Validators.required]],
      nombreSelect: [this.data.nombreCliente, Validators.required],
      apellidoPaternoSelect: [
        this.data.apellidoPaternoCliente,
        Validators.required,
      ],
      apellidoMaternoSelect: [
        this.data.apellidoMaternoCliente,
        Validators.required,
      ],
      descripcionSelect: [this.data.descripcion, Validators.required],
      fechaInicioSelect: [
        [new Date(this.data.fechaInicio).toISOString()],
        Validators.required,
      ],
      fechaFinSelect: [[this.data.fechaFin], Validators.required],
      costoCuarto: [[this.data.cuarto.costoNoche], Validators.required],
    });
  }

  ngOnInit(): void {
    const fechaInicio = this.data.fechaInicio.toString().replaceAll('-', '/');
    const fechaFin = this.data.fechaFin.toString().replaceAll('-', '/');
    this.modificacionReserva.controls['fechaInicioSelect'].setValue(
      new Date(fechaInicio)
    );
    this.modificacionReserva.controls['fechaFinSelect'].setValue(
      new Date(fechaFin)
    );
    this.ciudadesService.getCiudadesOrigen().subscribe(
      (data) => {
        this.ciudadesOrigen = data;
        this.modificacionReserva.controls['origenSelect'].setValue(
          this.data.vuelo.origen.idCiudad
        );
      },
      (error) => {
        console.log('Error => ', error);
      }
    );
    this.ciudadesService.getCiudadesDestino().subscribe(
      (data) => {
        this.ciudadesDestino = data;
        this.modificacionReserva.controls['destinoSelect'].setValue(
          this.data.vuelo.destino.idCiudad
        );
      },
      (error) => {
        console.log('Error => ', error);
      }
    );
    this.vueloService.getVuelos('').subscribe(
      (data) => {
        this.vuelos = data;
        this.modificacionReserva.controls['vueloSelect'].setValue(
          this.data.vuelo.idVuelo
        );
      },
      (error) => {
        console.log('Error => ', error);
      }
    );
    this.hotelService
      .getFiltrosHoteles('', '', this.data.vuelo.destino.idCiudad.toString())
      .subscribe(
        (data) => {
          this.hoteles = data;
          this.modificacionReserva.controls['hotelSelect'].setValue(
            this.data.cuarto.idHotel
          );
          
        },
        (error) => {
          console.log('Error => ', error);
        }
      );
    this.cuartoService.obtenerListaFiltro(this.data.cuarto.idHotel).subscribe(
      (data) => {
        this.cuartos = data;
        this.modificacionReserva.controls['cuartoSelect'].setValue(
          this.data.cuarto.idCuarto
        );
        this.modificacionReserva.controls['costoCuarto'].setValue(
          this.data.cuarto.costoNoche
        );
      },
      (error) => {
        console.log('Error => ', error);
      }
    );
    this.modificacionReserva.get('costoCuarto').disable();
  }

  cancelar() {
    this.dialogRef.close();
  }

  guardar() {
    if (this.modificacionReserva.valid) {
      
      this.reservaModificacion.nombreCliente =
        this.modificacionReserva.controls['nombreSelect'].value;
      this.reservaModificacion.apellidoPaternoCliente =
        this.modificacionReserva.controls['apellidoPaternoSelect'].value;
      this.reservaModificacion.apellidoMaternoCliente =
        this.modificacionReserva.controls['apellidoMaternoSelect'].value;
      this.reservaModificacion.fechaInicio =
        this.modificacionReserva.controls['fechaInicioSelect'].value;
      this.reservaModificacion.fechaFin =
        this.modificacionReserva.controls['fechaFinSelect'].value;
      this.reservaModificacion.descripcion =
        this.modificacionReserva.controls['descripcionSelect'].value;
      this.reservaModificacion.idVuelo =
        this.modificacionReserva.controls['vueloSelect'].value;
      this.reservaModificacion.idHotel =
        this.modificacionReserva.controls['hotelSelect'].value;
      this.reservaModificacion.idCuarto =
        this.modificacionReserva.controls['cuartoSelect'].value;

      this.reservaModificacion.fechaInicio.setHours(18);
      this.reservaModificacion.fechaFin.setHours(18);
      this.modificacionReserva.controls['cuartoSelect'].setValidators([
        Validators.required,
        Validators.maxLength(1),
      ]);

      this.reservaService
        .updateReserva(this.data.idReserva, this.reservaModificacion)
        .subscribe(
          (data) => {
            this.snackBarService.openSnackBar(
              'success',
              'La reserva fue modificada exitosamente',
              'Reserva modificada'
            );
            this.dialogRef.close();
          },
          (error) => {}
        );
    } else {
      this.snackBarService.openSnackBar(
        'warning',
        'El formulario no es valido',
        'Advertencia'
      );
    }
  }

  origenChange() {
    this.modificacionReserva.get('vueloSelect').enable();
    const origenId = this.modificacionReserva.getRawValue().origenSelect;
    const destinoId = this.modificacionReserva.getRawValue().destinoSelect;
    let ciudadesDestinoAux = [];
    let vuelosAuxiliar = [];
    let ciudadesId = [];
    this.vueloService.getVuelos('?origen=' + origenId).subscribe(
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
        this.ciudadesDestino = ciudadesDestinoAux;
        this.vuelos = vuelosAuxiliar;
      },
      (error) => {}
    );
  }

  destinoChange() {
    this.modificacionReserva.get('vueloSelect').enable();
    this.modificacionReserva.get('hotelSelect').enable();
    const destinoId = this.modificacionReserva.getRawValue().destinoSelect;
    this.hoteles = [];
    let ciudadesOrigenAux = [];
    let vuelosAuxiliar = [];
    let ciudadesId = [];
    this.cuartos = [];
    this.modificacionReserva.controls['cuartoSelect'].setValue('');
    this.vueloService.getVuelos('?destino=' + destinoId).subscribe(
      (respuesta) => {
        const vuelos = respuesta;
        vuelos.forEach((vuelo) => {
          if (!ciudadesId.includes(vuelo.origen.idCiudad)) {
            ciudadesId.push(vuelo.origen.idCiudad);
            ciudadesOrigenAux.push(vuelo.origen);
            this.modificacionReserva.controls['origenSelect'].setValue(
              ciudadesId[0]
            );
          }
          vuelosAuxiliar.push({
            idVuelo: vuelo.idVuelo,
            codigoVuelo: vuelo.codigoVuelo,
          });
        });
        //this.ciudadesOrigen = ciudadesOrigenAux;
        this.vuelos = vuelosAuxiliar;
      },
      (error) => {}
    );

    let hotelesAux = [];
    if (destinoId != '') {
      this.hotelService
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
    this.modificacionReserva.get('hotelSelect').enable();
  }

  hotelChange() {
    this.modificacionReserva.get('cuartoSelect').enable();
    const hotelId = this.modificacionReserva.getRawValue().hotelSelect;
    let cuartosAuxiliar = [];
    this.cuartoService.obtenerListaFiltro(hotelId).subscribe(
      (respuesta) => {
        const cuartos = respuesta;
        cuartos.forEach((cuarto) => {
          cuartosAuxiliar.push({
            idCuarto: cuarto.idCuarto,
            tipoCuarto: cuarto.tipoCuarto,
            costoNoche: cuarto.costoNoche,
          });
        });

        this.cuartos = cuartosAuxiliar;
        if (this.cuartos.length === 0) {
          this.snackBarService.openSnackBar(
            'error',
            'Este Hotel no cuenta con cuartos',
            'Error'
          );
        }
      },
      (error) => {}
    );
  }

  cuartoChange() {
    const cuartoId = this.modificacionReserva.getRawValue().cuartoSelect;
    const cuarto = this.cuartos.filter(
      (cuarto) => cuarto.idCuarto === cuartoId
    );
    if (cuarto.length > 0) {
      
      this.modificacionReserva.controls['costoCuarto'].setValue(
        cuarto[0].costoNoche
      );
    }
  }
}
