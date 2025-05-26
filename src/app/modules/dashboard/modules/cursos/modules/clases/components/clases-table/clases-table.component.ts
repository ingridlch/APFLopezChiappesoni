import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Clase } from '../../models';
import { AuthService } from '../../../../../../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../../../../../../core/models';

@Component({
  selector: 'app-clases-table',
  standalone: false,
  templateUrl: './clases-table.component.html',
  styles: ``
})
export class ClasesTableComponent {
  displayedColumns: string[] = ['nombre', 'descripcion', 'acciones'];

  @Input()
  dataSource: Clase[] = [];
  
  @Output()
  deleteClase = new EventEmitter<number>();
  
  @Output()
  editClase = new EventEmitter<Clase>();

  authUser$: Observable<User | null>;
  constructor(private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
  }
}
