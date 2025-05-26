import { Injectable } from '@angular/core';
import { Curso, CursoForm } from './models';
import { Observable, concatMap, forkJoin, map, mergeMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Alumno } from './../alumnos/models';
import { Inscripcion,InscripcionExpand } from './../../../../core/models';

@Injectable({ providedIn: 'root' })
export class CursosService {
    constructor(private http: HttpClient) {}
    getCursos$(): Observable<Curso[]> {
        //return of([...CURSOS]).pipe(delay(500));
        return this.http.get<Curso[]>(`http://localhost:3000/courses`);
    }
  getById(id: string): Observable<Curso> {
    return this.http.get<Curso>(`http://localhost:3000/courses/${id}`);
  }
  getInscriptionsById(id:string): Observable<InscripcionExpand[]> {
    //return this.http.get<InscriptionsExpand[]>(`http://localhost:3000/inscriptions?courseId=${id}`);
    return this.http.get<Inscripcion[]>(`http://localhost:3000/inscriptions?courseId=${id}`)
    .pipe(
      mergeMap(inscriptions => {
        // Creamos un array de observables para obtener cada curso
        const requests = inscriptions.map(inscription =>
          this.http.get<Alumno>(`http://localhost:3000/students/${inscription.studentId}`)
            .pipe(
              map(alumno => ({
                ...inscription,
                nombre: alumno.nombre + ' ' + alumno.apellido
              }))
            )
        );
        // Ejecutamos todas las peticiones en paralelo y esperamos a que todas terminen
        return forkJoin(requests);
      })
    );
  }
  create(curso: CursoForm): Observable<Curso> {
    return this.http.post<Curso>(`http://localhost:3000/courses`, curso);
  }
  delete(id: string): Observable<Curso[]> {
    return this.http
      .delete<Curso[]>(`http://localhost:3000/courses/${id}`)
      .pipe(concatMap(() => this.getCursos$()));
  }
  update(id: string, curso: CursoForm): Observable<Curso[]> {
    return this.http.patch<Curso>(`http://localhost:3000/courses/${id}`, curso)
      .pipe(concatMap(() => this.getCursos$()));
  }
}