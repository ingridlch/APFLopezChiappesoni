import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Alumno } from '../../models';

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
}
