import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ciudades } from 'src/app/models/Identity/ciudades';
import { VuelosReservas } from 'src/app/models/Identity/vuelosReservas';
import { AerolineaService } from 'src/app/services/aerolinea.service';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Aerolinea } from '../../../models/aerolinea.interface';

@Component({
  selector: 'app-alta-vuelo',
  templateUrl: './alta-vuelo.component.html',
  styleUrls: ['./alta-vuelo.component.css']
})
export class AltaVueloComponent {
  altaVuelo:FormGroup;
  ciudades: Ciudades[];
  aerolineas: Aerolinea[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:VuelosReservas ,
    public dialogRef: MatDialogRef<AltaVueloComponent>,
    private fb: FormBuilder,
    private ciudadesService : CiudadesService,
    private snackBarService: SnackBarService,
    private aerolineaService: AerolineaService
  ){}

  ngOnInit(): void {
    console.log(this.data);
    this.altaVuelo = this.fb.group({
      origenSelect:[[],Validators.required],
      codigo:[[],Validators.required],
      costo:[[],Validators.required],
      horaSalida:[[],Validators.required],
      horaLlegada:[[],Validators.required],
    });
    this.ciudadesService.getCiudades('').subscribe(
      data => {
        this.ciudades = data;        
      }, error =>{
        console.log("Error => ", error);
      }
    );
    this.aerolineaService.getAerolineas().subscribe(
      data =>{
        this.aerolineas = data;
      }, error =>{
        console.log("Error => ", error);
      }
    );
  }

  guardar(){
    console.log('Es formulario Valido', this.altaVuelo.valid);
    this.snackBarService.openSnackBar('error','El formulario no es valido','Error');
    this.dialogRef.close();
  }
  cancelar(){
    this.dialogRef.close();
  }

}
