import { Component , OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cuarto } from 'src/app/models/cuarto';
import { AltaReserva } from 'src/app/models/Identity/altaReserva';
import { Ciudades } from 'src/app/models/Identity/ciudades';
import { Hoteles } from 'src/app/models/Identity/hoteles';
import { Reservas } from 'src/app/models/Identity/reservas';
import { Vuelo } from 'src/app/models/vuelo.interface';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { CuartoService } from 'src/app/services/cuarto.service';
import { HotelesServiceTsService } from 'src/app/services/hoteles.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { VuelosService } from 'src/app/services/vuelos.service';

@Component({
  selector: 'app-modifica-reserva',
  templateUrl: './modifica-reserva.component.html',
  styleUrls: ['./modifica-reserva.component.css']
})
export class ModificaReservaComponent implements OnInit {
  modificacionReserva:FormGroup;
  ciudadesOrigen: Ciudades[];
  ciudadesDestino: Ciudades[];
  vuelos: Vuelo[];
  hoteles: Hoteles[];
  cuartos: Cuarto[];
  reservaModificacion: AltaReserva = new AltaReserva();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:Reservas ,
    public dialogRef: MatDialogRef<ModificaReservaComponent>,
    private fb: FormBuilder,
    private ciudadesService : CiudadesService,
    private vueloService: VuelosService,
    private hotelService: HotelesServiceTsService,
    private cuartoService: CuartoService,
    private reservaService: ReservasService,
    private snackBarService: SnackBarService,
  ){}

  ngOnInit(): void {
    console.log(this.data);
    this.modificacionReserva = this.fb.group({
      origenSelect:[[],Validators.required],
      destinoSelect:[[],Validators.required],
      vueloSelect:[[],Validators.required],
      hotelSelect:[[], Validators.required],
      cuartoSelect:[[], Validators.required],
      nombreSelect:[(this.data.nombreCliente),Validators.required],
      apellidoPaternoSelect:[(this.data.apellidoPaternoCliente),Validators.required],
      apellidoMaternoSelect: [(this.data.apellidoMaternoCliente), Validators.required],
      descripcionSelect:[(this.data.descripcion), Validators.required],
      fechaInicioSelect:[[new Date(this.data.fechaInicio).toISOString()], Validators.required],
      fechaFinSelect:[[this.data.fechaFin], Validators.required],
      costoCuarto:[[this.data.cuarto.costoNoche],Validators.required]
    });
    const fechaInicio = this.data.fechaInicio.toString().replaceAll('-','/');
    const fechaFin = this.data.fechaFin.toString().replaceAll('-','/');
    console.log(this.data.fechaInicio)
    console.log(new Date(this.data.fechaInicio))
    console.log(new Date(this.data.fechaInicio).toISOString())
    this.modificacionReserva.controls['fechaInicioSelect'].setValue(new Date(fechaInicio));
    this.modificacionReserva.controls['fechaFinSelect'].setValue(new Date (fechaFin));
    this.ciudadesService.getCiudadesOrigen().subscribe(
      data => {
        this.ciudadesOrigen = data;
        this.modificacionReserva.controls['origenSelect'].setValue(this.data.vuelo.origen.idCiudad);
      }, error =>{
        console.log("Error => ", error);
      }
    ); 
    this.ciudadesService.getCiudadesDestino().subscribe(
      data => {
        this.ciudadesDestino = data;
        this.modificacionReserva.controls['destinoSelect'].setValue(this.data.vuelo.destino.idCiudad);
      }, error =>{
        console.log("Error => ", error);
      }
    );
     this.vueloService.getVuelos('').subscribe(
      data => {
        this.vuelos = data;
        this.modificacionReserva.controls['vueloSelect'].setValue(this.data.vuelo.idVuelo);
      }, error =>{
        console.log("Error => ", error);
      }
    );  
    this.hotelService.getHoteles().subscribe(
      data => {
        this.hoteles = data;
        this.modificacionReserva.controls['hotelSelect'].setValue(this.data.cuarto.idHotel);
      }, error =>{
        console.log("Error => ", error);
      }
    );   
    this.cuartoService.obtenerListaDeHabitaciones().subscribe(
      data => {
        this.cuartos = data;
        console.log(this.data.cuarto.idHotel);
        this.modificacionReserva.controls['cuartoSelect'].setValue(this.data.cuarto.idCuarto);
        this.modificacionReserva.controls['costoCuarto'].setValue(this.data.cuarto.costoNoche);
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
    console.log(this.data.idReserva);
    this.reservaModificacion.nombreCliente = this.modificacionReserva.controls['nombreSelect'].value;
    this.reservaModificacion.apellidoPaternoCliente = this.modificacionReserva.controls['apellidoPaternoSelect'].value;
    this.reservaModificacion.apellidoMaternoCliente = this.modificacionReserva.controls['apellidoMaternoSelect'].value;
    this.reservaModificacion.fechaInicio = this.modificacionReserva.controls['fechaInicioSelect'].value;
    this.reservaModificacion.fechaFin = this.modificacionReserva.controls['fechaFinSelect'].value;
    this.reservaModificacion.descripcion = this.modificacionReserva.controls['descripcionSelect'].value;
    this.reservaModificacion.idVuelo = this.modificacionReserva.controls['vueloSelect'].value;
    this.reservaModificacion.idHotel = this.modificacionReserva.controls['hotelSelect'].value;
    this.reservaModificacion.idCuarto = this.modificacionReserva.controls['cuartoSelect'].value;

    console.log(this.reservaModificacion);

    if(this.modificacionReserva.valid === true){
      console.log(this.reservaModificacion);
      this.reservaService.updateReserva(this.data.idReserva, this.reservaModificacion).subscribe( data =>{
      this.snackBarService.openSnackBar('success','La reserva fue modificada exitosamente','Reserva Actualizada');
      this.dialogRef.close();
      }, error =>{}
      );
    }else{
      this.snackBarService.openSnackBar('warning','El formulario no es valido','Reserva incorrecta');
    } 
  }

}
