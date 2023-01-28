import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { VuelosReservas } from 'src/app/models/Identity/vuelosReservas';
import { Ciudades } from 'src/app/models/Identity/ciudades';

@Component({
  selector: 'app-modifica-vuelo',
  templateUrl: './modifica-vuelo.component.html',
  styleUrls: ['./modifica-vuelo.component.css']
})
export class ModificaVueloComponent implements OnInit {
  modificacionVuelo:FormGroup;
  ciudadesOrigen: Ciudades[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:VuelosReservas ,
    public dialogRef: MatDialogRef<ModificaVueloComponent>,
    private fb: FormBuilder,
    private ciudadesService : CiudadesService
  ){}

  ngOnInit(): void {
    console.log(this.data);
    this.modificacionVuelo = this.fb.group({
      origenSelect:[[],Validators.required],
      consto:[[this.data.costo],Validators.required],
      horaSalida:[[],Validators.required],
      horaLlegada:[[],Validators.required],
    });
    this.ciudadesService.getCiudadesOrigen().subscribe(
      data => {
        this.ciudadesOrigen = data;
        this.modificacionVuelo.controls['origenSelect'].setValue(this.data.origen.idCiudad);
      }, error =>{
        console.log("Error => ", error);
      }
    );
  }

  origenChange(){

  }

  cancelar(){
    this.dialogRef.close();
  }

  guardar(){
    console.log('Es formulario Valido');
  }
}
