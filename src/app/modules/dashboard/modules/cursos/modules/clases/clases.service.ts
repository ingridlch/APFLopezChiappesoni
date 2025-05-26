import { Injectable } from '@angular/core';
import { Clase } from './models';
import { delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const CLASES: Clase[] = [
    {id: 1, nombre: 'masas quebradas', descripcion: 'masas friables: sablée, brisée y sucrée', curso_id: 1},
    {id: 2, nombre: 'masas batidas livianas', descripcion: 'de textura aireada usadas para elaboración de bizcochuelos, piononos y vainillas', curso_id: 1},
    {id: 3, nombre: 'masas batidas pesadas', descripcion: 'caracterizadas por tener presencia de manteca u otra materia grasa, incluye budines, brownies, muffins', curso_id:1},
    {id: 4, nombre: 'masas levadas', descripcion: 'trabajo con levadura, elaboración de poolish, creación de diferentes panes', curso_id:1},
    {id: 5, nombre: 'masas laminadas', descripcion: 'hojaldre francés, invertido y rápido. hojaldre de levadura, masa philo y strudel.', curso_id:1},
    {id: 6, nombre: 'cocina salada', descripcion: 'arrollado, acompañamientos, finger food', curso_id:2},
    {id: 7, nombre: 'cocina dulce', descripcion: 'pan dulce, galletas de jengibre, bastones de caramelo', curso_id:2},
    {id: 8, nombre: 'masas y armado', descripcion: 'masas batidas pesadas, rellenos', curso_id:3},
    {id: 9, nombre: 'decorado', descripcion: 'ganache de sellado y decoración, masas de forrado', curso_id:3},
  ];

@Injectable({ providedIn: 'root' })
export class ClasesService {
    constructor(private http: HttpClient) {}
    getClasesByCurso(id:string): Observable<Clase[]> {
        /*const clasesFiltradas = CLASES.filter(clase => clase.curso_id === id);
        return of(clasesFiltradas).pipe(delay(500));*/
        return this.http.get<Clase[]>(`http://localhost:3000/classes?course_id=${id}`);
    }
}