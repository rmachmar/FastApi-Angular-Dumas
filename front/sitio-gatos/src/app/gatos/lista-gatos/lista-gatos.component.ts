import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GatoDTO } from 'src/app/modelos/gatoDTO';
import { GatoService } from 'src/app/servicios/gatos.service';

declare var $: any;

@Component({
  selector: 'app-lista-gatos',
  templateUrl: './lista-gatos.component.html',
  styleUrls: ['./lista-gatos.component.css']
})
export class ListaGatosComponent implements OnInit {

  listaGatos: Array<GatoDTO> = [];
  idEliminar: number = 0;

  constructor(private _gatosService:GatoService, private router: Router) { }

  ngOnInit(): void {
    $(".cargador-inicial").css({"display": ""});
    this.CargarGatos();
  }

  CargarGatos() {
    this._gatosService.ObtenerGatos()
      .subscribe(
        data => {
          this.listaGatos = data;
          $(".cargador-inicial").css({"display": "none"});
        }
      );
  }

  seleccionarIDEliminar(id: number) {
    this.idEliminar = id;
  }

  eliminarRegistro() {
    this._gatosService.EliminarGato(this.idEliminar)
      .subscribe(
        data => {
          window.location.reload();
        }
      );
  }

}
