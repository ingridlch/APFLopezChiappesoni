import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Clase } from '../../models';

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
}
