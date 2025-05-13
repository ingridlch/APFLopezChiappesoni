import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos.component';
import { ClasesComponent } from './modules/clases/clases.component';

const routes: Routes = [
  {
    path: '',
    component: CursosComponent,
  },
  {
    path: ':id',
    component : ClasesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
