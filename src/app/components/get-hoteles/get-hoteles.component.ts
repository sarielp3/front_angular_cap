import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { HotelesServiceTsService } from 'src/app/services/hoteles.service';
import { Hoteles } from 'src/app/models/Identity/hoteles';
import { Ciudades } from 'src/app/models/Identity/ciudades';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { AltaHotelesComponent } from '../../components/get-hoteles/alta-hoteles/alta-hoteles.component';
import { ModificarHotelesComponent } from '../../components/get-hoteles/modificar-hoteles/modificar-hoteles.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';



@Component({
  selector: 'app-get-hoteles',
  templateUrl: './get-hoteles.component.html',
  styleUrls: ['./get-hoteles.component.css']
})
export class GetHotelesComponent implements OnInit,AfterViewInit {
  displayedColumns = ['ciudad','nombre','codigo','direccion','logo','modificar','eliminar','estatus'];
  codigoHotel = '';
  nombreHotel = '';
  public ListaHoteles: Hoteles[] = [];
  public NombreHoteles: Hoteles[] = [];
  public ciudades:Ciudades[] = [];
  public loading!: boolean;
  public filtroForm: UntypedFormGroup;
  dataSource!:MatTableDataSource<Hoteles>;
  constructor(private serviceHoteles:HotelesServiceTsService, public dialog: MatDialog,private snackBarService: SnackBarService){
    this.filtroForm = new UntypedFormGroup({
      nombreHotel: new UntypedFormControl(''),
      codigoHotel: new UntypedFormControl(''),
      ciudadHotel: new UntypedFormControl('')
    });
    
  }

  @ViewChild('paginator', {static:false}) paginator: MatPaginator | null = null;

  ngOnInit() {
    this.getHoteles();
    this.getCiudades();
    
    
    //this.onSubmit();
    this.dataSource = new MatTableDataSource<Hoteles>(this.ListaHoteles);
  }

  ngAfterViewInit(){
    
    this.dataSource.paginator = this.paginator;
  }
  
  public onSubmit(){
      this.serviceHoteles.getFiltrosHoteles(this.filtroForm.controls['nombreHotel'].value,this.filtroForm.controls['codigoHotel'].value,this.filtroForm.controls['ciudadHotel'].value).subscribe(
        (data)=>{
          this.ListaHoteles=data;
        },
        err => {
          this.ListaHoteles =[];
        }
      )
  }

  public getHoteles(){
    this.loading = true; 
        this.serviceHoteles.getHoteles().subscribe(
          (data)=>{
            this.ListaHoteles=data; 
            this.NombreHoteles=data; 
            this.loading = false;  
          }
        )
        
  }

  

  public getCiudades(){
    this.serviceHoteles.getCiudades().subscribe(
      (data)=>{
        this.ciudades=data;
      }
    )
  }

  public altaHotel(){
    console.log('Clic en boton Alta');
    const dialogoRef = this.dialog.open(AltaHotelesComponent,{
      disableClose: true ,     
    });
    dialogoRef.afterClosed().subscribe(result =>{
      console.log(result);
     
      this.getHoteles();
    });
   
  }

  modificar(elemento){
   
    console.log('Clic en boton modificar');
    const dialogoRef = this.dialog.open(ModificarHotelesComponent,{
      data: elemento,
      disableClose: true ,     
    });
    dialogoRef.afterClosed().subscribe(result =>{
      console.log(result);
      this.getHoteles();
    });
  }

  cambiarStatus(enable: boolean,elemento,check:MatSlideToggleChange){
    const dialogoRef = this.dialog.open(ConfirmDialogComponent,{
      disableClose:true
    });
    dialogoRef.afterClosed().subscribe(respuesta =>{
      console.log(respuesta);
      if(respuesta){
        this.serviceHoteles.cambiarEstatus(elemento.idHotel).subscribe(
          (respuesta) =>{
            this.snackBarService.openSnackBar(
              'success',
              'Estatus cambiado correctamente',
              'success'
            );
            this.getHoteles();
          }
        );
      }
      else{
        check.source.checked = !enable;
        this.snackBarService.openSnackBar(
          'warning',
          'Solicitud de estatus cancelada',
          'warning'
        );
      }
    })
      
  }

  eliminar(elemento:Hoteles){
    const dialogoRef = this.dialog.open(ConfirmDialogComponent,{
      disableClose:true,
      data:true
    });
    dialogoRef.afterClosed().subscribe(respuesta =>{
      console.log(respuesta);
      if(respuesta){
        
        this.serviceHoteles.eliminar(elemento.idHotel).subscribe(
          (data)=>{
            console.log('Eliminamos Registro con Id',elemento.idHotel );
            this.snackBarService.openSnackBar('success', 'registro eliminado con exito','success');
            this.getHoteles();
          }
        )
      }
    })
  }

  public limpiarFiltros(){
    this.filtroForm.controls['nombreHotel'].setValue(''); 
    this.filtroForm.controls['codigoHotel'].setValue(''); 
    this.filtroForm.controls['ciudadHotel'].setValue(''); 
    this.getHoteles();
  }
  
}
