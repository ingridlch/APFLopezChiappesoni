import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../../../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../../../../core/models';

@Component({
  selector: 'app-usuarios-table',
  standalone: false,
  templateUrl: './usuarios-table.component.html',
  styles: ``
})
export class UsuariosTableComponent {
  displayedColumns: string[] = ['nombre', 'email', 'acciones'];

  @Input()
  dataSource: User[] = [];

  @Output()
  deleteUsuario = new EventEmitter<number>();

  @Output()
  editUsuario = new EventEmitter<User>();

  authUser$: Observable<User | null>;
  constructor(private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
  }
}