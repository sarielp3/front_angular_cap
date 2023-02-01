import { OnInit,Inject,Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  eliminarOHabilitar:boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: boolean,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ){}

  ngOnInit(): void {
      this.eliminarOHabilitar = this.data;
  }

  close(respuesta: boolean){
    this.dialogRef.close(respuesta);
  }
}
