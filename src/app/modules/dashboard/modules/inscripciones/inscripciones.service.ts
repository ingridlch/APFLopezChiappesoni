import { Injectable } from '@angular/core';
import { Inscripcion,InscripcionForm } from './../../../../core/models';
import { Observable, concatMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class InscripcionesService {
  constructor(private http: HttpClient) {}
  get$(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`http://localhost:3000/inscriptions?_embed=student&_embed=course`);
  }
  create(inscription: InscripcionForm): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(`http://localhost:3000/students`, inscription);
  }
  delete(id: string): Observable<Inscripcion> {
    return this.http.delete<Inscripcion>(`http://localhost:3000/inscriptions/${id}`);
  }
}