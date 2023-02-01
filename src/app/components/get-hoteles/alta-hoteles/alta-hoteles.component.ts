import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { HotelesServiceTsService } from 'src/app/services/hoteles.service';
import { Hoteles } from 'src/app/models/Identity/hoteles';
import { Ciudades } from 'src/app/models/Identity/ciudades';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-alta-hoteles',
  templateUrl: './alta-hoteles.component.html',
  styleUrls: ['./alta-hoteles.component.css']
})
export class AltaHotelesComponent implements OnInit {
  imgURL:any;
  public selectedFile;
  public event1;
  receivedIMG:any;
  base64Data:any;
  convertedIMG:any;
  public Hotel:Hoteles = {
    idHotel:0,
    ciudad:{
      idCiudad:0,
      nombreCiudad:''
    },
    nombreHotel:'',
    codigoHotel:'',
    direccion:'',
    estatus:'',
    logo:''
  }
  public altaForm: UntypedFormGroup;
  public ciudades:Ciudades[] = [];
  constructor(public dialogRef: MatDialogRef<AltaHotelesComponent>,private serviceHoteles:HotelesServiceTsService){
    this.altaForm = new UntypedFormGroup({
      nombreHotel: new UntypedFormControl('', [Validators.required, Validators.minLength(1)]),
      codigoHotel: new UntypedFormControl('', [Validators.required, Validators.minLength(1)]),
      ciudadHotel: new UntypedFormControl('', [Validators.required, Validators.minLength(1)]),
      direccion: new UntypedFormControl('', [Validators.required, Validators.minLength(1)]),
      logo: new UntypedFormControl('')
    });
  }

  public ngOnInit(): void {
    this.getCiudades();
  }

  onSubmit(){
    if (this.altaForm.valid){
      this.guardar();
    }else{
      console.log("no valido")
    }
    
  }
  guardar(){
    this.Hotel.ciudad.idCiudad = this.altaForm.controls['ciudadHotel'].value;
    this.Hotel.nombreHotel = this.altaForm.controls['nombreHotel'].value;
    this.Hotel.codigoHotel = this.altaForm.controls['codigoHotel'].value;
    this.Hotel.direccion = this.altaForm.controls['direccion'].value;
    //this.Hotel.logo = this.altaForm.controls['logo'].value;
    this.Hotel.logo = null;
    this.Hotel.estatus = "1";
    this.serviceHoteles.altaHotel(this.Hotel).subscribe();
    console.log("Exito, registro guardado");
    this.dialogRef.close();
  }

  cancelar(){
    this.dialogRef.close();
  }

  public getCiudades(){
    this.serviceHoteles.getCiudades().subscribe(
      (data)=>{
        this.ciudades=data;
      }
    )
  }

  onFileChanged(event){
    console.log(event);
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // this.Hotel.logo = 'data:image/jpge;base64,' + event.target.files[0];
     console.log(this.Hotel.logo);
    reader.onload = (event2) =>{
      this.imgURL = reader.result;
      this.Hotel.logo = reader.result;
      console.log(this.Hotel.logo);
    };


  }
}
