import { Component,Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Ciudades } from 'src/app/models/Identity/ciudades';
import { CiudadesService } from 'src/app/services/ciudades.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-alta-reserva',
  templateUrl: './alta-reserva.component.html',
  styleUrls: ['./alta-reserva.component.css']
})
export class AltaReservaComponent implements OnInit{
  altaReserva:FormGroup;
  

  ciudadesOrigen : Ciudades[];
  ciudadesDestino : Ciudades[];

  constructor(
    private fb: FormBuilder,
    private ciudadesService : CiudadesService,
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<AltaReservaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){}

    ngOnInit(){
      this.altaReserva = this.fb.group({
        origenSelect:[[],Validators.required],
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
      this.snackBarService.openSnackBar('error','El formulario no es valido','Error');
      this.dialogRef.close();
    }
    cancelar(){
      this.dialogRef.close();
    }

    origenChange(){
      const origenId = this.altaReserva.getRawValue().origenSelect;
      // Llamamos a cargar Destino
      this.ciudadesService.getCiudadesDestino().subscribe(
        data => {
          this.ciudadesDestino = data;
        }, error =>{
          console.log('Error =>', error);
        }

      )
    }

}
