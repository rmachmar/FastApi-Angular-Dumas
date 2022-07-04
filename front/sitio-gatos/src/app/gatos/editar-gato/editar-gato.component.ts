import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Favoritos } from 'src/app/modelos/favoritos';
import { GatoDTO } from 'src/app/modelos/gatoDTO';
import { GatoService } from 'src/app/servicios/gatos.service';
import { ImagenesService } from 'src/app/servicios/imagenes.service';

declare var $: any;

@Component({
  selector: 'app-editar-gato',
  templateUrl: './editar-gato.component.html',
  styleUrls: ['./editar-gato.component.css']
})
export class EditarGatoComponent implements OnInit {

  miFormulario:FormGroup;
  gato:GatoDTO = <GatoDTO>{};
  idTabla:number;
  listaFavs: Favoritos[] = [];
  urlFavoritos: string[] = [];
  
  constructor(private _gatosService:GatoService, private fb: FormBuilder, private router: Router, 
              private actRoute: ActivatedRoute, private _imagenesService:ImagenesService) {
    this.idTabla = this.actRoute.snapshot.params.id;
    this.miFormulario = this.fb.group({
      nombre: ['', [Validators.required]],
      raza: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      foto: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
    $(".cargador-inicial").css({"display": ""});
    this._gatosService.ObtenerGato(this.idTabla).subscribe(data => {
      this.gato = data;
      this.miFormulario.patchValue({
        nombre: this.gato.Nombre, 
        raza: this.gato.Raza, 
        edad: this.gato.Edad,
        foto: this.gato.Foto
      });     
    });
    this.CargarFavoritos(); 
    $(".cargador-inicial").css({"display": "none"});      
         
  }

  CargarFavoritos() {
    this._imagenesService.ObtenerFavoritos()
      .subscribe(
        data => {
          this.listaFavs = <Favoritos[]>JSON.parse(data);
          this.urlFavoritos = this.listaFavs.map(s => s.image.url);
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

  onSubmit(){
    if(this.miFormulario.valid){    
      this.gato.Nombre = this.miFormulario.get('nombre')?.value;
      this.gato.Raza = this.miFormulario.get('raza')?.value;
      this.gato.Edad = Number.parseInt(this.miFormulario.get('edad')?.value);
      this.gato.Foto = this.miFormulario.get('foto')?.value;

      this._gatosService.ActualizarGato(this.gato).subscribe(data => {
        this.router.navigate(['/gatos']);
      });
    }
  }

}
