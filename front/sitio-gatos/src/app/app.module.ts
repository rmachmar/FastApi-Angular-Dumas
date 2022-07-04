import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImagenesService } from './servicios/imagenes.service';
import { FavoritosComponent } from './imagenes/favoritos/favoritos.component';
import { GatoService } from './servicios/gatos.service';
import { ListaGatosComponent } from './gatos/lista-gatos/lista-gatos.component';
import { CrearGatoComponent } from './gatos/crear-gato/crear-gato.component';
import { ListaImagenesComponent } from './imagenes/lista-imagenes/lista-imagenes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarGatoComponent } from './gatos/editar-gato/editar-gato.component';

@NgModule({
  declarations: [
    AppComponent,
    FavoritosComponent,
    CrearGatoComponent,
    ListaGatosComponent,
    ListaImagenesComponent,
    EditarGatoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ImagenesService,
    GatoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
