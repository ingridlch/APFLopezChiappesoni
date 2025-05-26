import { Injectable } from '@angular/core';
import { Curso } from './models';
import { delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const CURSOS: Curso[] = [
    {id: 1, nombre: 'Panadería y pastelería', descripcion: 'Con este curso aprenderás bases y técnicas de la panadería y pastelería clásica.'},
    {id: 2, nombre: 'Cocina navideña', descripcion: 'Con este curso corto de dos clases aprenderás platos salados y dulces para la mesa navideña.'},
    {id: 3, nombre: 'Decoración de pasteles con bordes perfectos', descripcion: 'Curso corto para aprender cómo decorar las tortas con bordes filosos y obtener resultados impecables.'},
];

@Injectable({ providedIn: 'root' })
export class CursosService {
    constructor(private http: HttpClient) {}
    getCursos$(): Observable<Curso[]> {
        //return of([...CURSOS]).pipe(delay(500));
        return this.http.get<Curso[]>(`http://localhost:3000/courses`);
    }
}