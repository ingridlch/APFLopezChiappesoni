import { Component } from '@angular/core';
import { Inscripcion, InscripcionExpandComplete } from './../../../../core/models';
import { InscripcionesService } from './inscripciones.service';
import { Alumno } from './../alumnos/models';
import { AlumnosService } from './../alumnos/alumnos.service';
import { Curso } from './../cursos/models';
import { CursosService } from './../cursos/cursos.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models';

@Component({
  selector: 'app-inscripciones',
  standalone: false,
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss'
})
export class InscripcionesComponent {
  isLoading = false;
  inscripciones : Inscripcion[] = [];
  inscripcionCompleta : InscripcionExpandComplete[] = [];
  alumnos : Alumno[] = [];
  cursos : Curso[] = [];
  alumnosSubscription: Subscription | null = null; // Subscription to manage the observable
  authUser$: Observable<User | null>;
    
    constructor(private inscripcionesService: InscripcionesService, private alumnosService: AlumnosService, private cursosService: CursosService, private authService: AuthService){
      this.authUser$ = this.authService.authUser$;
      this.loadInscripcionCompleta();
    }
  
    loadInscripcionCompleta() {
      console.log('Lista inscripciones')
    }

}
