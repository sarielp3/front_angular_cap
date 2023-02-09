import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../shared/components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  classSnack: string;

  getTypeComponent(type: string): void {
    switch (type) {
      case 'success':
        this.classSnack = 'success-snackbar';
        break;
      case 'warning':
        this.classSnack = 'warning-snackbar';
        break;
      case 'error':
        this.classSnack = 'error-snackbar';
        break;
    }
  }

  public openSnackBar(type: string, text: string, titulo: string) {
    this.getTypeComponent(type);
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        titulo: titulo,
        mensaje: text,
        type: type,
      },
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: [this.classSnack],
    });
  }
}
