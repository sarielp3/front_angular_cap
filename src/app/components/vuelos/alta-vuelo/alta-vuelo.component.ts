import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AltaVuelo } from 'src/app/models/alta-vuelo.interface';
import { Ciudades } from 'src/app/models/Identity/ciudades';
import { VuelosReservas } from 'src/app/models/Identity/vuelosReservas';
import { AerolineaService } from 'src/app/services/aerolinea.service';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { VuelosService } from 'src/app/services/vuelos.service';
import { Aerolinea } from '../../../models/aerolinea.interface';
import { Vuelo } from '../../../models/vuelo.interface';

@Component({
  selector: 'app-alta-vuelo',
  templateUrl: './alta-vuelo.component.html',
  styleUrls: ['./alta-vuelo.component.css'],
})
export class AltaVueloComponent {
  loading: boolean = false;
  disableButon: boolean = false;
  altaVuelo: FormGroup;
  ciudades: Ciudades[];
  aerolineas: Aerolinea[];
  vueloAlta: AltaVuelo = {
    idVuelo: null,
    origen: null,
    destino: null,
    aerolinea: null,
    horaSalida: null,
    horaLlegada: null,
    codigoVuelo: null,
    costo: null,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: VuelosReservas,
    public dialogRef: MatDialogRef<AltaVueloComponent>,
    private fb: FormBuilder,
    private ciudadesService: CiudadesService,
    private snackBarService: SnackBarService,
    private aerolineaService: AerolineaService,
    private vueloService: VuelosService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.altaVuelo = this.fb.group({
      origenControl: [[], Validators.required],
      destinoControl: [[], Validators.required],
      aerolieaControl: [[], Validators.required],
      codigoControl: [[], Validators.required],
      costoControl: [[], Validators.required],
      horaSalidaControl: [[], Validators.required],
      horaLlegadaControl: [[], Validators.required],
    });
    this.ciudadesService.getCiudades('').subscribe(
      (data) => {
        this.ciudades = data;
        this.aerolineaService.getAerolineas().subscribe(
          (data) => {
            this.aerolineas = data;
            this.loading = false;
          },
          (error) => {
            console.log('Error => ', error);
            this.loading = false;
          }
        );
      },
      (error) => {
        this.loading = false;
        console.log('Error => ', error);
      }
    );
  }

  guardar() {
    this.disableButon = true;
    this.vueloAlta.origen = this.altaVuelo.controls['origenControl'].value;
    this.vueloAlta.destino = this.altaVuelo.controls['destinoControl'].value;
    this.vueloAlta.aerolinea = this.altaVuelo.controls['aerolieaControl'].value;
    this.vueloAlta.horaSalida =
      String(this.altaVuelo.controls['horaSalidaControl'].value) + ':00';
    this.vueloAlta.horaLlegada =
      String(this.altaVuelo.controls['horaLlegadaControl'].value) + ':00';
    this.vueloAlta.codigoVuelo = this.altaVuelo.controls['codigoControl'].value;
    this.vueloAlta.costo = Number(
      this.altaVuelo.controls['costoControl'].value
    );

    if (this.altaVuelo.valid === true) {
      if (this.vueloAlta.origen === this.vueloAlta.destino) {
        this.snackBarService.openSnackBar(
          'Advertencia',
          'La ciudad de origen debe ser diferente a la ciudad de destino',
          'Advertencia'
        );
        this.disableButon = false;
      } else {
        this.loading = true;
        this.vueloService.createVuelo(this.vueloAlta).subscribe(
          (data) => {
            this.vueloService.vuelos.push(data);
            this.vueloService.emisor.next(this.vueloService.vuelos);
            this.snackBarService.openSnackBar(
              'Éxito',
              'El vuelo se guardo de manera exitosa',
              'Éxito'
            );
            this.loading = false;
            this.disableButon = false;
            this.dialogRef.close();
          },
          (error) => {
            this.loading = false;
          }
        );
      }
    } else {
      this.snackBarService.openSnackBar(
        'error',
        'El formulario no es valido',
        'error'
      );
      this.disableButon = false;
    }
  }
  cancelar() {
    this.dialogRef.close();
  }
}
