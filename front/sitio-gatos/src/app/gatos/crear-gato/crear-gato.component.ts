import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Favoritos } from 'src/app/modelos/favoritos';
import { GatoDTO } from 'src/app/modelos/gatoDTO';
import { GatoService } from 'src/app/servicios/gatos.service';
import { ImagenesService } from 'src/app/servicios/imagenes.service';

declare var $: any;

@Component({
  selector: 'app-crear-gato',
  templateUrl: './crear-gato.component.html',
  styleUrls: ['./crear-gato.component.css']
})
export class CrearGatoComponent implements OnInit {

  miFormulario:FormGroup;
  gato:GatoDTO = <GatoDTO>{};
  listaFavs: Favoritos[] = [];
  urlFavoritos: string[] = [];
  
  constructor(private _gatosService:GatoService, private fb: FormBuilder, private router: Router, private _imagenesService:ImagenesService) {
    this.miFormulario = this.fb.group({
      nombre: ['', [Validators.required]],
      raza: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      foto: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
    $(".cargador-inicial").css({"display": ""});
    this.CargarFavoritos();    
    this.miFormulario.patchValue({
        nombre: this.gato.Nombre, 
        raza: this.gato.Raza, 
        edad: this.gato.Edad,
        foto: this.gato.Foto
      }); 
  }

  CargarFavoritos() {
    this._imagenesService.ObtenerFavoritos()
      .subscribe(
        data => {
          this.listaFavs = <Favoritos[]>JSON.parse(data);
          this.urlFavoritos = this.listaFavs.map(s => s.image.url);
          $(".cargador-inicial").css({"display": "none"});      
        }
      );
  }

  MarcarFoto(url:string) {
    $("#foto").val(url);
    $("#imgGatoFav").attr("src", url);    
    $(".claseOcultar").removeClass("claseOcultar");
    this.miFormulario.patchValue({
      foto: url
    });
  }

  OnSubmit(){
    if(this.miFormulario.valid){  
      this.gato.Id = 0;  
      this.gato.Nombre = this.miFormulario.get('nombre')?.value;
      this.gato.Raza = this.miFormulario.get('raza')?.value;
      this.gato.Edad = Number.parseInt(this.miFormulario.get('edad')?.value);
      this.gato.Foto = this.miFormulario.get('foto')?.value;

      this._gatosService.CrearGato(this.gato).subscribe(data => {
        this.router.navigate(['/gatos']);
      });
    }
  }

}
