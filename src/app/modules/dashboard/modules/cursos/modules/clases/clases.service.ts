import { Injectable } from '@angular/core';
import { Clase, ClaseForm } from './models';
import { delay, Observable, concatMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ClasesService {
    constructor(private http: HttpClient) {}
    getClasesByCurso(id:string): Observable<Clase[]> {
        /*const clasesFiltradas = CLASES.filter(clase => clase.curso_id === id);
        return of(clasesFiltradas).pipe(delay(500));*/
        return this.http.get<Clase[]>(`http://localhost:3000/classes?courseId=${id}`);
    }
    create(clase: ClaseForm): Observable<Clase> {
        return this.http.post<Clase>(`http://localhost:3000/classes`, clase);
    }
    delete(id: string, courseId: string): Observable<Clase[]> {
        return this.http
          .delete<Clase[]>(`http://localhost:3000/classes/${id}`)
          .pipe(concatMap(() => this.getClasesByCurso(courseId)));
    }
    update(id: string, clase: ClaseForm): Observable<Clase[]> {
        return this.http.patch<Clase>(`http://localhost:3000/classes/${id}`, clase)
          .pipe(concatMap(() => this.getClasesByCurso(clase.courseId)));
    }
}