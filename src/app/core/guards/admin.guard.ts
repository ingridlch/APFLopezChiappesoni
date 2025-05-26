import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return authService.authUser$.pipe(
    map((user) => {
      if (user && user.role === 'admin') {
        return true;
      } else {
        alert('No tiene permisos para acceder');
        return false;
      }
    })
  );
};
