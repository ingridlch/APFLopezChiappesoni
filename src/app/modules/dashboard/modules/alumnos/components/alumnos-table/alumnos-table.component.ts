import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Alumno } from '../../models';
import { AuthService } from '../../../../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../../../../core/models';

@Component({
  selector: 'app-alumnos-table',
  standalone: false,
  templateUrl: './alumnos-table.component.html',
  styles: ``
})
export class AlumnosTableComponent {
  displayedColumns: string[] = ['nombre', 'email', 'acciones'];

  @Input()
  dataSource: Alumno[] = [];

  @Output()
  deleteAlumno = new EventEmitter<number>();

  @Output()
  editAlumno = new EventEmitter<Alumno>();

  authUser$: Observable<User | null>;
  constructor(private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
  }
}
