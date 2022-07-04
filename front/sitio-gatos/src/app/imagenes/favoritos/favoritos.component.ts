import { Component, OnInit } from '@angular/core';
import { Favoritos } from 'src/app/modelos/favoritos';
import { ImagenesService } from 'src/app/servicios/imagenes.service';

declare var $: any;

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  listaFavs: Array<Favoritos> = [];
  grupo: Array<Favoritos>[] = [];

  constructor(private _imagenesService:ImagenesService) { }

  ngOnInit(): void {
    $(".cargador-inicial").css({"display": ""});
    this.CargarFavoritos();
  }

  CargarFavoritos() {
    this._imagenesService.ObtenerFavoritos()
      .subscribe(
        data => {
          this.listaFavs = <Favoritos[]>JSON.parse(data);
          this.AgruparElementos();  
          $(".cargador-inicial").css({"display": "none"});      
        }
      );
  }

  AgruparElementos() {    
    let favs: Array<Favoritos> = [];
    
    this.listaFavs.forEach((item) => {
      if(favs.length == 5){
        this.grupo.push(favs);
        favs = [];
      } 

      favs.push(item);

    });

    this.grupo.push(favs);

  }

}
