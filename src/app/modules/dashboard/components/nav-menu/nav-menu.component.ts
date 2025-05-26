import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './../../../../core/models';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-nav-menu',
  standalone: false,
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {
  authUser: Observable<User|null>;
  role = '';
  constructor(private router: Router, private authService:AuthService){
    this.authUser = this.authService.authUser$;
    authService.authUser$.subscribe(user => {
      this.role = user?.role || '';
    });
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['auth','login']);
  }
}
