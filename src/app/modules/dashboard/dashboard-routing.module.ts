import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'alumnos',
    data: { title: 'Alumnos' },
    loadChildren: () =>
      import('./modules/alumnos/alumnos.module').then((m) => m.AlumnosModule),
  },
  {
    path: 'cursos',
    data: { title: 'Cursos' },
    loadChildren: () =>
      import('./modules/cursos/cursos.module').then((m) => m.CursosModule),
  },
  {
    path: 'usuarios',
    canActivate: [adminGuard],
    data: { title: 'Usuarios' },
    loadChildren: () =>
      import('./modules/usuarios/usuarios.module').then((m) => m.UsuariosModule),
  },
  /*{
    path: 'inscripciones',
    data: { title: 'Inscripciones' },
    loadChildren: () =>
      import('./modules/inscripciones/inscripciones.module').then((m) => m.InscripcionesModule),
  },*/
  {
    path: '**',
    data: { title: 'Cursos' },
    loadChildren: () =>
      import('./modules/cursos/cursos.module').then((m) => m.CursosModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
