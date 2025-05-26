import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosTableComponent } from './components/usuarios-table/usuarios-table.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    UsuariosComponent,
    UsuariosTableComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule
  ],
  exports:[UsuariosComponent]
})
export class UsuariosModule { }
