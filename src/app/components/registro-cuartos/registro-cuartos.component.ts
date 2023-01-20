import { Component, OnInit } from '@angular/core';
import { Cuarto } from '../../models/cuarto';
import { CuartoService } from '../../services/cuarto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-cuartos',
  templateUrl: './registro-cuartos.component.html',
  styleUrls: ['./registro-cuartos.component.css']
})
export class RegistroCuartosComponent  implements OnInit{
 
habitacion: Cuarto = new Cuarto();

 constructor(private habitacionServicio: CuartoService, private router:Router){}

 ngOnInit(): void {
 }

 guardarHabitacion(){
  this.habitacionServicio.registraHabitaciones(this.habitacion).subscribe(dato =>{
    console.log(dato);
    this.irListaHabitaciones();
  }, error => console.log(error));
}

  irListaHabitaciones(){
    this.router.navigate(['/habitaciones']);
  }

  onSubmit(){
   this.guardarHabitacion();
  }

}


