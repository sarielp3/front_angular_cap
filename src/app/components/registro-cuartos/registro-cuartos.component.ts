import { Component, OnInit, Inject } from '@angular/core';
import { Cuarto } from '../../models/cuarto';
import { CuartoService } from '../../services/cuarto.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-registro-cuartos',
  templateUrl: './registro-cuartos.component.html',
  styleUrls: ['./registro-cuartos.component.css'],
})
export class RegistroCuartosComponent implements OnInit {
  habitacion: Cuarto = new Cuarto();
  public altaCuartos: UntypedFormGroup;

  constructor(
    private habitacionServicio: CuartoService,
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

  ngOnInit(): void {}

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

    this.habitacionServicio.registraHabitaciones(this.habitacion).subscribe();
    console.log('Dato guardado con exito');
    console.log(this.habitacion);
  }

  cancelar() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.altaCuartos.valid) {
      this.guardarHabitacion();
      this.dialogRef.close();
    } else {
      console.log('non valido');
    }
  }
}
