import { Component, OnInit } from '@angular/core';
import { Gatos } from 'src/app/modelos/gatos';
import { ImagenesService } from 'src/app/servicios/imagenes.service';

declare var $: any;

@Component({
  selector: 'app-lista-imagenes',
  templateUrl: './lista-imagenes.component.html',
  styleUrls: ['./lista-imagenes.component.css']
})
export class ListaImagenesComponent implements OnInit {

  listaGatos: Array<Gatos> = [];
  clicked = false;
  grupo: Array<Gatos>[] = [];

  constructor(private _imagenesService:ImagenesService) { }

  ngOnInit(): void {
    $(".cargador-inicial").css({"display": ""});
    this.cargarImagenesRandom();
  }

  cargarImagenesRandom() {
    this._imagenesService.ObtenerImagenes()
      .subscribe(
        data => {
          this.listaGatos = <Gatos[]>JSON.parse(data);
          this.AgruparElementos();
          $(".cargador-inicial").css({"display": "none"});
        }
      );
  }

  marcarFavorito (id: string) {
    this._imagenesService.MarcarImagenFavorito(id).subscribe(
      data => {
        
      }
    );
  }

  AgruparElementos() {    
    let favs: Array<Gatos> = [];
    
    this.listaGatos.forEach((item) => {
      if(favs.length == 5){
        this.grupo.push(favs);
        favs = [];
      } 

      favs.push(item);

    });

    this.grupo.push(favs);

  }

}
