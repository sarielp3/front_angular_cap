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

@Component({
  selector: 'app-get-hoteles',
  templateUrl: './get-hoteles.component.html',
  styleUrls: ['./get-hoteles.component.css']
})
export class GetHotelesComponent implements OnInit,AfterViewInit {
  displayedColumns = ['id','ciudad','nombre','codigo','direccion','estatus','logo','modificar','habilitar','eliminar'];
  codigoHotel = '';
  nombreHotel = '';
  public ListaHoteles: Hoteles[] = [];
  public NombreHoteles: Hoteles[] = [];
  public ciudades:Ciudades[] = [];
  public loading!: boolean;
  public filtroForm: UntypedFormGroup;
  dataSource!:MatTableDataSource<Hoteles>;
  constructor(private serviceHoteles:HotelesServiceTsService, public dialog: MatDialog){
    this.filtroForm = new UntypedFormGroup({
      nombreHotel: new UntypedFormControl('', [Validators.required, Validators.minLength(1)]),
      codigoHotel: new UntypedFormControl('', [Validators.required, Validators.minLength(1)]),
      ciudadHotel: new UntypedFormControl('', [Validators.required, Validators.minLength(1)])
    });
    
  }

  @ViewChild('paginator', {static:false}) paginator: MatPaginator | null = null;

  ngOnInit() {
    this.getHoteles();
    this.getCiudades();
    this.getNombreHoteles();
    
    this.onSubmit();
    this.dataSource = new MatTableDataSource<Hoteles>(this.ListaHoteles);
  }

  ngAfterViewInit(){
    
    this.dataSource.paginator = this.paginator;
  }
  
  public onSubmit(){
    if (this.filtroForm.controls['nombreHotel'].value || this.filtroForm.controls['codigoHotel'].value || this.filtroForm.controls['ciudadHotel'].value) {
      this.serviceHoteles.getFiltrosHoteles(this.filtroForm.controls['nombreHotel'].value,this.filtroForm.controls['codigoHotel'].value,this.filtroForm.controls['ciudadHotel'].value).subscribe(
        (data)=>{
          this.ListaHoteles=data;
        },
        err => {
          this.ListaHoteles =[];
        }
      )
      
    }else{
      return;
    }
  }

  public getHoteles(){
    this.loading = true; 
        this.serviceHoteles.getHoteles().subscribe(
          (data)=>{
            this.ListaHoteles=data; 
            this.loading = false;  
          }
        )
  }

  public getNombreHoteles(){
    this.serviceHoteles.getHoteles().subscribe(
      (data)=>{
        this.NombreHoteles=data;   
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
    });
  }

  eliminar(elemento:Hoteles){
    const dialogoRef = this.dialog.open(ConfirmDialogComponent,{
      disableClose:true
    });
    dialogoRef.afterClosed().subscribe(respuesta =>{
      console.log(respuesta);
      if(respuesta){
        
        this.serviceHoteles.eliminar(elemento.idHotel).subscribe(
          (data)=>{
            console.log('Eliminamos Registro con Id',elemento.idHotel );
            this.getHoteles();
          }
        )
      }
    })
  }
  
}
