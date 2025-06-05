import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosTableComponent } from './components/usuarios-table/usuarios-table.component';
import { SharedModule } from '../../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { usuariosFeature } from './store/usuarios.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsuariosEffects } from './store/usuarios.effects';


@NgModule({
  declarations: [
    UsuariosComponent,
    UsuariosTableComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    StoreModule.forFeature(usuariosFeature),
    EffectsModule.forFeature([UsuariosEffects]),
  ],
  exports:[UsuariosComponent]
})
export class UsuariosModule { }
