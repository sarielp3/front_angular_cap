import { Component,Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Ciudades } from 'src/app/models/Identity/ciudades';
import { CiudadesService } from 'src/app/services/ciudades.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-alta-reserva',
  templateUrl: './alta-reserva.component.html',
  styleUrls: ['./alta-reserva.component.css']
})
export class AltaReservaComponent implements OnInit{
  altaReserva:FormGroup;
  

  ciudadesOrigen : Ciudades[];

  constructor(
    private fb: FormBuilder,
    private ciudadesService : CiudadesService,
    public dialogRef: MatDialogRef<AltaReservaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){}

    ngOnInit(){
      this.altaReserva = this.fb.group({
        nombre:[[],Validators.required]
      }); 
      this.ciudadesService.getCiudadesOrigen().subscribe(
        data => {
          console.log("Data =>",data);
          this.ciudadesOrigen = data;
        },error => {
          console.log("Error =>",error);
        }
      )
    }

    guardar(){
      console.log('Es formulario Valido', this.altaReserva.valid);
    }

}
