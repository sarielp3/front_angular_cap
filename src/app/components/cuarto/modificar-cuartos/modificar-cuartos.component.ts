import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Cuarto } from 'src/app/models/cuarto';
import { CuartoService } from 'src/app/services/cuarto.service';

@Component({
  selector: 'app-modificar-cuartos',
  templateUrl: './modificar-cuartos.component.html',
  styleUrls: ['./modificar-cuartos.component.css'],
})
export class ModificarCuartosComponent implements OnInit {
  habitacion: Cuarto = new Cuarto();
  public modificarForm: UntypedFormGroup;

  constructor(
    private habitacionServicio: CuartoService,
    public dialogRef: MatDialogRef<ModificarCuartosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modificarForm = new UntypedFormGroup({
      nombreCuarto: new UntypedFormControl(this.data.nombreCuarto, [
        Validators.required,
        Validators.minLength(1),
      ]),
      descripcion: new UntypedFormControl(this.data.descripcion, [
        Validators.required,
        Validators.minLength(1),
      ]),
      numeroPersonas: new UntypedFormControl(this.data.numeroPersonas, [
        Validators.required,
        Validators.minLength(1),
      ]),
      codigoCuarto: new UntypedFormControl(this.data.codigoCuartos, [
        Validators.required,
        Validators.minLength(1),
      ]),
      costoNoche: new UntypedFormControl(this.data.costoNoche, [
        Validators.required,
        Validators.minLength(1),
      ]),
      tipoCuarto: new UntypedFormControl(this.data.tipoCuarto, [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  ngOnInit(): void {}

  cambiosHabitacion() {
    this.habitacion.nombreCuarto =
      this.modificarForm.controls['nombreCuarto'].value;

    this.habitacion.descripcion =
      this.modificarForm.controls['descripcion'].value;

    this.habitacion.numeroPersonas =
      this.modificarForm.controls['numeroPersonas'].value;

    this.habitacion.codigoCuartos =
      this.modificarForm.controls['codigoCuarto'].value;

    this.habitacion.costoNoche =
      this.modificarForm.controls['costoNoche'].value;

    this.habitacion.tipoCuarto =
      this.modificarForm.controls['tipoCuarto'].value;

    this.habitacion.idHotel = this.data.idHotel;

    this.habitacionServicio
      .modificarHabitaciones(this.habitacion, this.data.idCuarto)
      .subscribe(
        (res) => {
          console.log('exito, registro modificado y guardado');
        },
        (err) => {
          console.log(err);
        }
      );

    console.log(this.habitacion);
  }

  onSubmit() {
    if (this.modificarForm.valid) {
      this.cambiosHabitacion();
      this.dialogRef.close();
    } else {
      console.log('no valido');
    }
  }
  cancelar() {
    this.dialogRef.close();
  }
}
