import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthComponent } from './modules/auth/auth.component';
import { authenticationGuard } from './core/guards/authentication.guard';

const routes: Routes = [
  {
    path : 'dashboard',
    component : DashboardComponent,
    canActivate : [authenticationGuard],
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path : 'auth',
    component: AuthComponent,
    loadChildren: () =>
      import('./modules/auth/auth.module').then(
        (m)=> m.AuthModule
      ),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
