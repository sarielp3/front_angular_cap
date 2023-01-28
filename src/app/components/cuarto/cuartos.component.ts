import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuarto } from '../../models/cuarto';
import { CuartoService } from '../../services/cuarto.service';

@Component({
  selector: 'app-cuartos',
  templateUrl: './cuartos.component.html',
  styleUrls: ['./cuartos.component.css']
})
export class CuartosComponent implements OnInit{

  habitaciones : Cuarto[];

  constructor(private cuartoService: CuartoService, private router:Router){}

    ngOnInit(): void {
     this.obtenerHabitaciones();
  }

  private obtenerHabitaciones(){
     this.cuartoService.obtenerListaDeHabitaciones().subscribe(dato =>{
      console.log(dato);
     this.habitaciones = dato;
    },
  error => {
    console.log(error);
    
  }
    
    );
  }

  btnAgregar(){
    this.router.navigate(['/registrarHabitaciones']);
  }
}
