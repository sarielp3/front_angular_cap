import { Component, OnInit } from '@angular/core';
import { Cuarto } from '../../models/cuarto';
import { CuartoService } from '../../services/cuarto.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { RegistroCuartosComponent } from './alta-cuartos/alta-cuartos.component';
import { ModificarCuartosComponent } from './modificar-cuartos/modificar-cuartos.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SnackBarService } from 'src/app/services/snack-bar.service';
@Component({
  selector: 'app-cuartos',
  templateUrl: './cuartos.component.html',
  styleUrls: ['./cuartos.component.css'],
})
export class CuartosComponent implements OnInit {
  displayedColumns: string[] = [
    'Nombre del cuarto',
    'Descripcion',
    'Numero de personas',
    'Codigo del cuarto',
    'Costo por noche',
    'Modificar',
    'Eliminar',
    'habilitar',
  ];

  titulo = 'Lista de cuartos';
  public habitaciones: Cuarto[] = [];

  dataSource = new MatTableDataSource<Cuarto>(this.habitaciones);

  constructor(
    private snackBarService: SnackBarService,
    private cuartoService: CuartoService,
    public dialog: MatDialog
  ) {}

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
    dialogoRef.afterClosed().subscribe((respuesta) => {
      this.obtenerHabitaciones();
      console.log(respuesta);
    });
  }

  modificarCuartos(idCuarto: number) {
    console.log('clic en boton de modificacion');
    console.log(idCuarto);
    const dialogoRef = this.dialog.open(ModificarCuartosComponent, {
      data: idCuarto,
      disableClose: true,
    });
    dialogoRef.afterClosed().subscribe((respuesta) => {
      this.obtenerHabitaciones();
      console.log(respuesta);
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
          this.snackBarService.openSnackBar(
            'success',
            'Registro eliminado',
            'success'
          );
          console.log(dato);
          this.obtenerHabitaciones();
        }
      });
    });
  }

  cambiarStatus(enable: boolean, elemento, check: MatSlideToggleChange) {
    const dialogoRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
    });
    dialogoRef.afterClosed().subscribe((respuesta) => {
      if (respuesta) {
        this.cuartoService
          .estatusHabitacion(elemento.idCuarto)
          .subscribe((respuesta) => {
            this.snackBarService.openSnackBar(
              'success',
              'Estatus cambiado correctamente',
              'success'
            );
            this.obtenerHabitaciones();
          });
      } else {
        check.source.checked = !enable;
        this.snackBarService.openSnackBar(
          'warning',
          'solicitud de estatus cancelada',
          'warning'
        );
      }
    });
  }
}
