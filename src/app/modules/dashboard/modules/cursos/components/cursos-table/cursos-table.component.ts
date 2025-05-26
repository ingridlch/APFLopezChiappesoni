import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Curso } from '../../models';
import { AuthService } from '../../../../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../../../../core/models';

@Component({
  selector: 'app-cursos-table',
  standalone: false,
  templateUrl: './cursos-table.component.html',
  styles: ``
})
export class CursosTableComponent {
  displayedColumns: string[] = ['nombre', 'descripcion', 'clases', 'acciones'];

  @Input()
  dataSource: Curso[] = [];

  @Output()
  deleteCurso = new EventEmitter<number>();

  @Output()
  editCurso = new EventEmitter<Curso>();

  authUser$: Observable<User | null>;
  constructor(private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
  }
}
