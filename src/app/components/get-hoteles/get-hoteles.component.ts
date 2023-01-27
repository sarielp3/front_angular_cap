import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { first, debounceTime } from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { HotelesServiceTsService } from 'src/app/services/hoteles.service';
import { Hoteles } from 'src/app/models/Identity/hoteles';
import { Ciudades } from 'src/app/models/Identity/ciudades';
import { DomSanitizer } from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

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
  public filtroForm: UntypedFormGroup;
  dataSource!:MatTableDataSource<Hoteles>;
  constructor(private serviceHoteles:HotelesServiceTsService){
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
        this.serviceHoteles.getHoteles().subscribe(
          (data)=>{
            this.ListaHoteles=data;   
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
}
