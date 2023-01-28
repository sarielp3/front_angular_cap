import { Component, OnInit } from '@angular/core';
import { Cuarto } from '../../models/cuarto';
import { CuartoService } from '../../services/cuarto.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { RegistroCuartosComponent } from '../registro-cuartos/registro-cuartos.component';

@Component({
  selector: 'app-cuartos',
  templateUrl: './cuartos.component.html',
  styleUrls: ['./cuartos.component.css'],
})
export class CuartosComponent implements OnInit {
  displayedColumns: string[] = [
    'Id del cuarto',
    'Nombre del cuarto',
    'Descripcion',
    'Numero de personas',
    'Codigo del cuarto',
    'Costo por noche',
    'Tipo de cuarto',
    'Id del hotel',
    'Status del cuarto',
    'Modificar',
    'Eliminar',
  ];

  titulo = 'Lista de cuartos';
  public habitaciones: Cuarto[] = [];
  dataSource = new MatTableDataSource<Cuarto>(this.habitaciones);

  constructor(private cuartoService: CuartoService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.obtenerHabitaciones();
  }

  public obtenerHabitaciones() {
    this.cuartoService.obtenerListaDeHabitaciones().subscribe(
      (habitaciones) => {
        console.log(habitaciones);
        this.habitaciones = habitaciones;
        this.dataSource = new MatTableDataSource<Cuarto>(this.habitaciones);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  altaCuartos() {
    console.log('Clic en boton Alta');
    const dialogoRef = this.dialog.open(RegistroCuartosComponent, {
      disableClose: true,
    });
    dialogoRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  eliminarHabitacion(idHotel: number) {
    this.cuartoService.eliminarHabitacion(idHotel).subscribe((dato) => {
      const dialogoRef = this.dialog.open(ConfirmDialogComponent, {
        disableClose: true,
      });
      dialogoRef.afterClosed().subscribe((respuesta) => {
        console.log(respuesta);
        if (respuesta) {
          console.log(dato);
          this.obtenerHabitaciones();
        }
      });
    });
  }
}
