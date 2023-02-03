import { Component } from '@angular/core';
import { Vuelo } from '../../../models/vuelo.interface';
import { VuelosService } from '../../../services/vuelos.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {ModificaVueloComponent} from '../modifica-vuelo/modifica-vuelo.component'
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AltaVueloComponent } from '../alta-vuelo/alta-vuelo.component';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-tabla-vuelos',
  templateUrl: './tabla-vuelos.component.html',
  styleUrls: ['./tabla-vuelos.component.css']
})
export class TablaVuelosComponent {
  public loading!: boolean;
  displayedColumns: string[] = ['Origen', 'Destino', 'Aerolinea', 'Estatus','Hora de llegada','Hora de salida','Codigo del vuelo','Modificar','Habilitar','Eliminar'];
  vuelos: Vuelo[] = [];
  refreshTabla: Subscription;
  spinnerSub : Subscription;
  dataSource = new MatTableDataSource<Vuelo>(this.vuelos);
  

  constructor( private vueloService: VuelosService,
    public dialog: MatDialog,
    private snackBarService: SnackBarService){
    this.refreshTabla = this.vueloService.emisor.subscribe(
      ( vuelos: Vuelo[] ) =>{
        this.vuelos = vuelos;
        this.dataSource = new MatTableDataSource<Vuelo>(this.vuelos);
        console.log('vuelos tabla ' + this.vuelos);
      }
    )

    this.spinnerSub = this.vueloService.spinerEmmisor.subscribe( 
      (data : boolean) => {
        this.loading = data;
      }
    )
  }

  ngOnInit(): void {
       this.loading = true;
       this.listarTodosVuelos();
  }
  ngOnDestroy(): void {
    this.refreshTabla.unsubscribe();
  }

  listarTodosVuelos(){
    this.vueloService.getVuelos('')
    .subscribe( vuelos => {
      this.vuelos = vuelos;
      console.log(this.vuelos);
      this.vueloService.vuelos = this.vuelos
      this.dataSource = new MatTableDataSource<Vuelo>(this.vuelos);
      this.loading = false;
    }, err => {
      console.log('Error en GET vuelos');
      console.info(err);
      this.vueloService.vuelos = [];
      this.loading = false;
    }); 
  }
  modificar(elemento:Vuelo):void{
    console.log('Elemento =>', elemento);
    console.log('Clic en boton Modificar');
    const dialogoRef = this.dialog.open(ModificaVueloComponent,{
      data: elemento,
      disableClose: true ,     
    });
    dialogoRef.afterClosed().subscribe(result =>{
      console.log(result);
    });
  }

  eliminar(elemento:Vuelo):void{    
    const dialogoRef = this.dialog.open(ConfirmDialogComponent,{
      disableClose:true,
      data:true
    });
    dialogoRef.afterClosed().subscribe(respuesta =>{      
      if(respuesta){
        console.log('Eliminamos Registro con Id',elemento.idVuelo );
        this.loading = true;
        this.vueloService.deleteVuelo(elemento.idVuelo).subscribe( respuestaApi =>{
          this.snackBarService.openSnackBar('success', respuestaApi.mensajeRespuesta,'success');
          this.listarTodosVuelos();
        }, err => {          
          console.info(err);
          this.loading = false;
        });
      }
    })
  }

  altaReserva(){
    console.log('Clic en boton Alta');
    const dialogoRef = this.dialog.open(AltaVueloComponent,{
      disableClose: true ,     
    });
    dialogoRef.afterClosed().subscribe(result =>{
      console.log(result);
    });
  }

  onChange(enable: boolean,elemento : Vuelo, check:MatSlideToggleChange){    
    const dialogoRef = this.dialog.open(ConfirmDialogComponent,{
      disableClose:true
    });
    dialogoRef.afterClosed().subscribe(respuesta =>{            
      if(respuesta){
        this.loading = true;
        this.vueloService.cambioEstatus(elemento.idVuelo).subscribe( respuestaApi =>{          
          this.snackBarService.openSnackBar('success',respuestaApi.mensajeRespuesta,'Operacion Exitosa');
          this.listarTodosVuelos();
          }, err => {            
            console.info(err);
            this.loading = false;
          });        
      }else{
        check.source.checked = !enable;
      }
    })
  }
  
}
