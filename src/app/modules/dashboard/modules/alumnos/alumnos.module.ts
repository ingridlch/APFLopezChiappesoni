import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosComponent } from './alumnos.component';
import { AlumnosTableComponent } from './components/alumnos-table/alumnos-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { AlumnoNombreApellidoPipe } from './pipes/alumno-nombre-apellido.pipe';
import { TitlecolumnDirective } from './directives/titlecolumn.directive';
import { AlumnosDetailComponent } from './pages/alumnos-detail/alumnos-detail.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AlumnosComponent,
    AlumnosTableComponent,
    AlumnoNombreApellidoPipe,
    TitlecolumnDirective,
    AlumnosDetailComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatListModule
  ],
  exports:[AlumnosComponent]
})
export class AlumnosModule { }
