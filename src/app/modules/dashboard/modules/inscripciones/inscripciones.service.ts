import { Injectable } from '@angular/core';
import { Inscripcion,InscripcionForm, InscripcionExpandComplete } from './../../../../core/models';
import { Observable, concatMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class InscripcionesService {
  constructor(private http: HttpClient) {}
  get$(): Observable<InscripcionExpandComplete[]> {
    return this.http.get<Inscripcion[]>(`http://localhost:3000/inscriptions`);
  }
  create(inscription: InscripcionForm): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(`http://localhost:3000/students`, inscription);
  }
  delete(id: string): Observable<Inscripcion> {
    return this.http
      .delete<Inscripcion>(`http://localhost:3000/inscriptions/${id}`);
  }
}