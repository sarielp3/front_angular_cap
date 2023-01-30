import { Component , OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ciudades } from 'src/app/models/Identity/ciudades';
import { Reservas } from 'src/app/models/Identity/reservas';
import { CiudadesService } from 'src/app/services/ciudades.service';

@Component({
  selector: 'app-modifica-reserva',
  templateUrl: './modifica-reserva.component.html',
  styleUrls: ['./modifica-reserva.component.css']
})
export class ModificaReservaComponent implements OnInit {
  modificacionReserva:FormGroup;
  ciudadesOrigen: Ciudades[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:Reservas ,
    public dialogRef: MatDialogRef<ModificaReservaComponent>,
    private fb: FormBuilder,
    private ciudadesService : CiudadesService
  ){}

  ngOnInit(): void {
    console.log(this.data);
    this.modificacionReserva = this.fb.group({
      origenSelect:[[],Validators.required],
      nombre:[[this.data.nombreCliente],Validators.required]
    });
    this.ciudadesService.getCiudadesOrigen().subscribe(
      data => {
        this.ciudadesOrigen = data;
        this.modificacionReserva.controls['origenSelect'].setValue(this.data.vuelo.origen.idCiudad);
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
