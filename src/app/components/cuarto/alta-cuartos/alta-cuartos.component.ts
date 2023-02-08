import { Component, OnInit, Inject, Input } from '@angular/core';
import { Cuarto } from '../../../models/cuarto';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { CuartoService } from '../../../services/cuarto.service';
import { Router } from '@angular/router';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hoteles } from 'src/app/models/Identity/hoteles';
@Component({
  selector: 'app-registro-cuartos',
  templateUrl: './alta-cuartos.component.html',
  styleUrls: ['./alta-cuartos.component.css'],
})
export class RegistroCuartosComponent implements OnInit {
  habitacion: Cuarto = new Cuarto();
  public altaCuartos: UntypedFormGroup;

  constructor(
    private habitacionServicio: CuartoService,
    private snackBarService: SnackBarService,
    private router: Router,
    public dialogRef: MatDialogRef<RegistroCuartosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.altaCuartos = new UntypedFormGroup({
      nombreCuarto: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      descripcion: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      numeroPersonas: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      codigoCuarto: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      costoNoche: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      tipoCuarto: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  guardarHabitacion() {
    this.habitacion.nombreCuarto =
      this.altaCuartos.controls['nombreCuarto'].value;

    this.habitacion.descripcion =
      this.altaCuartos.controls['descripcion'].value;

    this.habitacion.numeroPersonas =
      this.altaCuartos.controls['numeroPersonas'].value;

    this.habitacion.codigoCuartos =
      this.altaCuartos.controls['codigoCuarto'].value;

    this.habitacion.costoNoche = this.altaCuartos.controls['costoNoche'].value;

    this.habitacion.tipoCuarto = this.altaCuartos.controls['tipoCuarto'].value;
    this.habitacion.status = 1;

    this.habitacionServicio
      .registraHabitaciones(this.habitacion, this.data)
      .subscribe((data) => {
        console.log(data);

        this.snackBarService.openSnackBar(
          'Éxito',
          'El cuarto fue creado exitosamente',
          'Éxito'
        );
        this.dialogRef.close();
      });

    console.log(this.habitacion);
  }

  cancelar() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.altaCuartos.valid) {
      this.guardarHabitacion();
    } else {
      this.snackBarService.openSnackBar(
        'Advertencia',
        'Llena todos los campos',
        'Advertencia'
      );
    }
  }
}
