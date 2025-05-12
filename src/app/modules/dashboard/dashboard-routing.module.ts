import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'alumnos',
    loadChildren: () =>
      import('./modules/alumnos/alumnos.module').then(
        (m) => m.AlumnosModule
      ),
  },
  {
    path: 'cursos',
    loadChildren: () =>
      import('./modules/cursos/cursos.module').then((m) => m.CursosModule),
  },
  /*{
    path: 'clases',
    loadChildren: () =>
      import('./modules/clases/clases.module').then((m) => m.ClasesModule),
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
