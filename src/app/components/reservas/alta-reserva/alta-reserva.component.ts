import { Component,Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Ciudades } from 'src/app/models/Identity/ciudades';
import { CiudadesService } from 'src/app/services/ciudades.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { VuelosService } from 'src/app/services/vuelos.service';
import { HotelesServiceTsService } from 'src/app/services/hoteles.service';
import { Vuelo } from 'src/app/models/vuelo.interface';
import { Hoteles } from 'src/app/models/Identity/hoteles';
import { Cuarto } from 'src/app/models/cuarto';
import { CuartoService } from 'src/app/services/cuarto.service';

@Component({
  selector: 'app-alta-reserva',
  templateUrl: './alta-reserva.component.html',
  styleUrls: ['./alta-reserva.component.css']
})
export class AltaReservaComponent implements OnInit{
  altaReserva:FormGroup;
  

  ciudadesOrigen : Ciudades[];
  ciudadesDestino : Ciudades[];
  vuelos : Vuelo[];
  hoteles : Hoteles[];
  cuartos : Cuarto[];

  constructor(
    private fb: FormBuilder,
    private ciudadesService : CiudadesService,
    private vuelosService : VuelosService,
    private hotelesServices : HotelesServiceTsService,
    private cuartosService : CuartoService,
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<AltaReservaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){}

    ngOnInit(){
      this.altaReserva = this.fb.group({
        origenSelect:[[],Validators.required],
        nombre:[[],Validators.required],
        cuartoSelect: [[],Validators.required],
        costoCuarto: [[],Validators.required]
      }); 
      this.ciudadesService.getCiudadesOrigen().subscribe(
        data => {
          console.log("Data =>",data);
          this.ciudadesOrigen = data;
        },error => {
          console.log("Error =>",error);
        }
      )
      this.ciudadesService.getCiudadesDestino().subscribe(
        data => {
        console.log("Data =>", data);
        this.ciudadesDestino = data;
      },error =>{
        console.log("Error =>", error);
      });
      this.vuelosService.getVuelos('').subscribe(
        vuelo => {
        console.log("Data =>", vuelo);
        this.vuelos = vuelo;
      },error =>{
        console.log("Error =>", error);
      });
      this.hotelesServices.getHoteles().subscribe(
        hotel => {
          console.log("Data =>", hotel);
          this.hoteles = hotel;
        },error =>{
          console.log("Error =>", error);
        });
      this.cuartosService.obtenerListaDeHabitaciones().subscribe(
          cuarto =>{
            console.log("Data =>", cuarto);
            this.cuartos = cuarto;
          },error =>{
            console.log("Error =>", error);
          });
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

    cuartoChange(){
      const cuartoId = this.altaReserva.getRawValue().cuartoSelect;
      console.log(cuartoId);
      const cuarto = this.cuartos.filter(cuarto=>cuarto.idCuarto=cuartoId);
      if (cuarto.length>1){
        const cuarto1 = cuarto[0];
        console.log(cuarto1);
        this.altaReserva.controls['costoCuarto'].setValue(cuarto1.costoNoche);
      }else{
        console.log(cuarto);
      }
    }
    

}
