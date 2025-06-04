import { Component } from '@angular/core';
import { Alumno } from '../../models';
import { InscripcionExpand } from './../../../../../../core/models';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AlumnosService } from '../../alumnos.service';
import { InscripcionesService } from '../../../inscripciones/inscripciones.service';

@Component({
  selector: 'app-alumnos-detail',
  standalone: false,
  templateUrl: './alumnos-detail.component.html',
  styles: ``
})
export class AlumnosDetailComponent {
  alumno$: Observable<Alumno | null>;
  inscripciones$ : Observable<InscripcionExpand[]>;

  constructor(private activatedRoute: ActivatedRoute, private alumnoService: AlumnosService, private inscripcionesService: InscripcionesService) {
    const id = this.activatedRoute.snapshot.params['id'];
    this.alumno$ = this.alumnoService.getById(id);
    this.inscripciones$ = this.alumnoService.getInscriptionsById(id);
  }

  onDeleteInscripcion(id: string) {
    if(confirm('Desea eliminar la inscripción al curso?')){
      this.inscripcionesService.delete(id.toLocaleString()).subscribe({
        next: (response) => {
          this.inscripciones$ = this.alumnoService.getInscriptionsById(id);
        },
      });
    }
  }
}
