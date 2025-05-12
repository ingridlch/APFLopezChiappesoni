import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Curso } from '../../models';

@Component({
  selector: 'app-cursos-table',
  standalone: false,
  templateUrl: './cursos-table.component.html',
  styles: ``
})
export class CursosTableComponent {
  displayedColumns: string[] = ['nombre', 'descripcion', 'acciones'];

  @Input()
  dataSource: Curso[] = [];

  @Output()
  deleteCurso = new EventEmitter<number>();

  @Output()
  editCurso = new EventEmitter<Curso>();
}
