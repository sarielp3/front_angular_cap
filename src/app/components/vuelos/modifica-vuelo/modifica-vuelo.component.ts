import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { VuelosReservas } from 'src/app/models/Identity/vuelosReservas';
import { Ciudades } from 'src/app/models/Identity/ciudades';
import { Aerolinea } from '../../../models/aerolinea.interface';
import { AerolineaService } from 'src/app/services/aerolinea.service';
import { AltaVuelo } from '../../../models/alta-vuelo.interface';
import { VuelosService } from 'src/app/services/vuelos.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-modifica-vuelo',
  templateUrl: './modifica-vuelo.component.html',
  styleUrls: ['./modifica-vuelo.component.css'],
})
export class ModificaVueloComponent implements OnInit {
  loading: boolean = false;
  disableButon: boolean = false;
  modificacionVuelo: FormGroup;
  ciudadesOrigen: Ciudades[];
  ciudadesDestino: Ciudades[];
  aerolineas: Aerolinea[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: VuelosReservas,
    public dialogRef: MatDialogRef<ModificaVueloComponent>,
    private fb: FormBuilder,
    private ciudadesService: CiudadesService,
    private aerolineaService: AerolineaService,
    private snackBarService: SnackBarService,
    private vueloService: VuelosService
  ) {}

  ngOnInit(): void {
    this.modificacionVuelo = this.fb.group({
      origenControl: [[], Validators.required],
      destinoControl: [[], Validators.required],
      aerolineaControl: [[], Validators.required],
      costoControl: [[this.data.costo], Validators.required],
      codigoControl: [[this.data.codigoVuelo], Validators.required],
      horaSalidaContol: [[this.data.horaSalida], Validators.required],
      horaLlegadaControl: [[this.data.horaLlegada], Validators.required],
    });
    this.loading = true;
    this.ciudadesService.getCiudadesOrigen().subscribe(
      (data) => {
        this.ciudadesOrigen = data;
        this.modificacionVuelo.controls['origenControl'].setValue(
          this.data.origen.idCiudad
        );
        this.ciudadesService.getCiudadesDestino().subscribe(
          (data) => {
            this.ciudadesDestino = data;
            this.modificacionVuelo.controls['destinoControl'].setValue(
              this.data.destino.idCiudad
            );
            this.aerolineaService.getAerolineas().subscribe(
              (data) => {
                this.aerolineas = data;
                this.modificacionVuelo.controls['aerolineaControl'].setValue(
                  this.data.aerolinea.idAerolinea
                );
                this.loading = false;
              },
              (error) => {
                this.loading = false;
                console.log('Error => ', error);
              }
            );
          },
          (error) => {
            this.loading = false;
            console.log('Error => ', error);
          }
        );
      },
      (error) => {
        this.loading = false;
        console.log('Error => ', error);
      }
    );
  }

  origenChange() {}

  cancelar() {
    this.dialogRef.close();
  }

  guardar() {
    let vueloPUT: AltaVuelo = {
      idVuelo: null,
      origen: null,
      destino: null,
      aerolinea: null,
      horaSalida: null,
      horaLlegada: null,
      codigoVuelo: null,
      costo: null,
    };
    vueloPUT.idVuelo = this.data.idVuelo;

    vueloPUT.origen = this.modificacionVuelo.controls['origenControl'].value;
    vueloPUT.destino = this.modificacionVuelo.controls['destinoControl'].value;
    vueloPUT.aerolinea =
      this.modificacionVuelo.controls['aerolineaControl'].value;
    vueloPUT.horaSalida = String(
      this.modificacionVuelo.controls['horaSalidaContol'].value
    );
    vueloPUT.horaLlegada = String(
      this.modificacionVuelo.controls['horaLlegadaControl'].value
    );
    vueloPUT.codigoVuelo = String(
      this.modificacionVuelo.controls['codigoControl'].value
    );
    vueloPUT.costo = Number(
      this.modificacionVuelo.controls['costoControl'].value
    );

    if (vueloPUT.horaLlegada != String(this.data.horaLlegada)) {
      vueloPUT.horaLlegada += ':00';
    }
    if (vueloPUT.horaSalida != String(this.data.horaSalida)) {
      vueloPUT.horaSalida += ':00';
    }
    console.log(vueloPUT);
    if (this.modificacionVuelo.valid === true) {
      if (vueloPUT.origen === vueloPUT.destino) {
        this.snackBarService.openSnackBar(
          'warning',
          'La ciudad de origen debe ser diferente a la ciudad de destino',
          'warning'
        );
      } else {
        this.loading = true;
        this.vueloService.updateVuelo(vueloPUT, this.data.idVuelo).subscribe(
          (data) => {
            this.vueloService.getVuelos('').subscribe(
              (vuelos) => {
                this.vueloService.vuelos = vuelos;
                this.vueloService.emisor.next(this.vueloService.vuelos);
                this.dialogRef.close();
              },
              (err) => {}
            );
            this.snackBarService.openSnackBar(
              'success',
              'El vuelo se guardo de manera exitosa',
              'success'
            );
            this.loading = false;
          },
          (error) => {}
        );
      }
    } else {
      this.snackBarService.openSnackBar(
        'warning',
        'El formulario no es valido',
        'Warning'
      );
    }
  }
}
