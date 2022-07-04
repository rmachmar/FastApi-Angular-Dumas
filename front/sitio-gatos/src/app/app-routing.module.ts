import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritosComponent } from './imagenes/favoritos/favoritos.component';
import { ListaGatosComponent } from './gatos/lista-gatos/lista-gatos.component';
import { ListaImagenesComponent } from './imagenes/lista-imagenes/lista-imagenes.component';
import { CrearGatoComponent } from './gatos/crear-gato/crear-gato.component';
import { EditarGatoComponent } from './gatos/editar-gato/editar-gato.component';

const routes: Routes = [
  { path: 'imagenes', component: ListaImagenesComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'gatos', component: ListaGatosComponent },
  { path: 'crear-gatos', component: CrearGatoComponent },
  { path: 'editar-gatos/:id', component: EditarGatoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
