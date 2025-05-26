import { Injectable } from '@angular/core';
import { Alumno, AlumnoForm } from './models';
import { Curso } from './../cursos/models';
import { Inscripcion,InscripcionExpand } from './../../../../core/models';
import { Observable, concatMap, of, forkJoin, map, mergeMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AlumnosService {
  constructor(private http: HttpClient) {}
  getAlumnos$(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`http://localhost:3000/students`);
  }
  getById(id: string): Observable<Alumno> {
    return this.http.get<Alumno>(`http://localhost:3000/students/${id}`);
  }
  getInscriptionsById(id:string): Observable<InscripcionExpand[]> {
    //return this.http.get<InscriptionsExpand[]>(`http://localhost:3000/inscriptions?courseId=${id}`);
    return this.http.get<Inscripcion[]>(`http://localhost:3000/inscriptions?studentId=${id}`)
    .pipe(
      mergeMap(inscriptions => {
        // Creamos un array de observables para obtener cada curso
        const requests = inscriptions.map(inscription =>
          this.http.get<Curso>(`http://localhost:3000/courses/${inscription.courseId}`)
            .pipe(
              map(course => ({
                ...inscription,
                nombre: course.nombre
              }))
            )
        );
        // Ejecutamos todas las peticiones en paralelo y esperamos a que todas terminen
        return forkJoin(requests);
      })
    );
  }
  create(alumno: AlumnoForm): Observable<Alumno> {
    return this.http.post<Alumno>(`http://localhost:3000/students`, alumno);
  }
  delete(id: string): Observable<Alumno[]> {
    return this.http
      .delete<Alumno[]>(`http://localhost:3000/students/${id}`)
      .pipe(concatMap(() => this.getAlumnos$()));
  }
  update(id: string, alumno: AlumnoForm): Observable<Alumno[]> {
    return this.http.patch<Alumno>(`http://localhost:3000/students/${id}`, alumno)
      .pipe(concatMap(() => this.getAlumnos$()));
  }
    /*getAlumnos$(): Observable<Alumno[]> {
        const alumnosObservable = new Observable<Alumno[]>((observer) => {
          setTimeout(() => {
            observer.next(ALUMNOS); // Emit the data
            observer.complete(); // Complete the observable after emitting the data
          }, 500);// Simulate a 1/2 second delay
        });
        return alumnosObservable;
    }*/
}