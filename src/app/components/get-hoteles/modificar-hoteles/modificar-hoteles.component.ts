import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HotelesServiceTsService } from 'src/app/services/hoteles.service';
import { Hoteles } from 'src/app/models/Identity/hoteles';
import { Ciudades } from 'src/app/models/Identity/ciudades';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-modificar-hoteles',
  templateUrl: './modificar-hoteles.component.html',
  styleUrls: ['./modificar-hoteles.component.css']
})
export class ModificarHotelesComponent implements OnInit {
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
    logo:null
  }
  imgURL:any;
  public selectedFile;
  public altaForm: UntypedFormGroup;
  public ciudades:Ciudades[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data:Hoteles,private serviceHoteles:HotelesServiceTsService,
  public dialogRef: MatDialogRef<ModificarHotelesComponent>,private snackBarService: SnackBarService){
    this.altaForm = new UntypedFormGroup({
      nombreHotel: new UntypedFormControl('', [Validators.required, Validators.minLength(1)]),
      codigoHotel: new UntypedFormControl('', [Validators.required, Validators.minLength(1)]),
      ciudadHotel: new UntypedFormControl('', [Validators.required, Validators.minLength(1)]),
      direccion: new UntypedFormControl('', [Validators.required, Validators.minLength(1)]),
      logo: new UntypedFormControl('',[Validators.required])
    });
  }
  ngOnInit(): void {
    console.log(this.data.idHotel);
    this.altaForm.controls['ciudadHotel'].setValue(this.data.ciudad.idCiudad);
    this.altaForm.controls['nombreHotel'].setValue(this.data.nombreHotel);
    this.altaForm.controls['codigoHotel'].setValue(this.data.codigoHotel);
    this.altaForm.controls['direccion'].setValue(this.data.direccion);
    this.imgURL = "data:image/png;base64," + this.data.logo;
    this.Hotel.logo =this.imgURL.split(",")[1];
    this.altaForm.controls['logo'].setValue(this.Hotel.logo);
    this.Hotel.estatus = this.data.estatus;
    this.getCiudades();
  }

  public getCiudades(){
    this.serviceHoteles.getCiudades().subscribe(
      (data)=>{
        this.ciudades=data;
      }
    )
  }

  onSubmit(){
    if (this.altaForm.valid){
      this.modificar();
    }else{
      console.log("no valido")
    }
    
  }
  
  modificar(){
    this.Hotel.ciudad.idCiudad = this.altaForm.controls['ciudadHotel'].value;
    this.Hotel.nombreHotel = this.altaForm.controls['nombreHotel'].value;
    this.Hotel.codigoHotel = this.altaForm.controls['codigoHotel'].value;
    this.Hotel.direccion = this.altaForm.controls['direccion'].value;
    this.Hotel.logo =this.imgURL.split(",")[1];
    this.serviceHoteles.modificar(this.data.idHotel,this.Hotel).subscribe(
      (res)=>{
        console.log("Exito, registro modificado y guardado");
        this.dialogRef.close();
      },err=> console.log(err)
    );
  }

  cancelar(){
    this.dialogRef.close();
  }

  onFileChanged(event){
    this.selectedFile = event.target.files[0];
    var a=document.querySelector<HTMLElement>(".logov");
    if(this.selectedFile == null){
      
      a.style.color = "red";
    }else{
      var archivo = this.selectedFile.name;
      console.log(archivo.slice((archivo.lastIndexOf(".") - 1 >>> 0) + 2));
      var extension = archivo.slice((archivo.lastIndexOf(".") - 1 >>> 0) + 2);
      if(extension == 'jpg' || extension == 'jpeg' || extension == 'png' || extension == 'gif'){
          a.style.color = "black";
          console.log("imagen valida");
          let reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (event2) => {
            this.imgURL = reader.result;
            this.altaForm.controls['logo'].setValue(this.imgURL.split(",")[1]);
          };
      }else{
          console.log("archivo no valido");
          this.snackBarService.openSnackBar('error', 'El archivo o imagen no es valido','Archivo no valido');
          this.altaForm.controls['logo'].setValue(null);
      }
      
    }

  }
}
