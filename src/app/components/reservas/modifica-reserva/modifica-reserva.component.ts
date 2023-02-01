import { Component , OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cuarto } from 'src/app/models/cuarto';
import { Ciudades } from 'src/app/models/Identity/ciudades';
import { Hoteles } from 'src/app/models/Identity/hoteles';
import { Reservas } from 'src/app/models/Identity/reservas';
import { Vuelo } from 'src/app/models/vuelo.interface';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { CuartoService } from 'src/app/services/cuarto.service';
import { HotelesServiceTsService } from 'src/app/services/hoteles.service';
import { ReservasService } from 'src/app/services/reservas.service';
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:Reservas ,
    public dialogRef: MatDialogRef<ModificaReservaComponent>,
    private fb: FormBuilder,
    private ciudadesService : CiudadesService,
    private vueloService: VuelosService,
    private hotelService: HotelesServiceTsService,
    private cuartoService: CuartoService,
    private reservaService: ReservasService
  ){}

  ngOnInit(): void {
    console.log(this.data);
    this.modificacionReserva = this.fb.group({
      origenSelect:[[],Validators.required],
      destinoSelect:[[],Validators.required],
      vueloSelect:[[],Validators.required],
      hotelSelect:[[], Validators.required],
      cuartoSelect:[[], Validators.required],
      nombreSelect:[[this.data.nombreCliente],Validators.required],
      apellidoPaternoSelect:[[this.data.apellidoPaternoCliente],Validators.required],
      apellidoMaternoSelect: [[this.data.apellidoMaternoCliente], Validators.required],
      descripcionSelect:[[this.data.descripcion], Validators.required],
      fechaInicioSelect:[[new Date(this.data.fechaInicio).toISOString()], Validators.required],
      fechaFinSelect:[[this.data.fechaFin], Validators.required],
      costoCuarto:[[this.data.cuarto.costoNoche],Validators.required]
    });
    console.log(this.data.fechaInicio)
    console.log(new Date(this.data.fechaInicio))
    console.log(new Date(this.data.fechaInicio).toISOString())
    this.modificacionReserva.controls['fechaInicioSelect'].setValue(new Date(this.data.fechaInicio).toISOString());
    this.modificacionReserva.controls['fechaFinSelect'].setValue(this.data.fechaFin);
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
    console.log('Es formulario Valido');
  }

}
