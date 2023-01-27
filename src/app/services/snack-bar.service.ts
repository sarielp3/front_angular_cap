import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../shared/components/snack-bar/snack-bar.component';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    constructor(private snackBar: MatSnackBar){}

    public openSnackBar(){
        this.snackBar.openFromComponent(SnackBarComponent,{
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 5000,
        });
    }

}