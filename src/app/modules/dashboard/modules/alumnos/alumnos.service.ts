import { Injectable } from '@angular/core';
import { Alumno } from './models';
import { Observable } from 'rxjs';

const ALUMNOS: Alumno[] = [
    {id: 1, nombre: 'Analía', apellido: 'Gervasoni', email: 'analia@gmail.com'},
    {id: 2, nombre: 'Benjamin', apellido: 'Hurtado', email: 'benja@gmail.com'},
    {id: 3, nombre: 'Cecilia', apellido: 'Alem', email: 'ceci@outlook.com'},
    {id: 4, nombre: 'Demetrio', apellido: 'Zaragoza', email: 'demetrio@outlook.com'},
    {id: 5, nombre: 'Ernestina', apellido: 'Curuzu', email: 'ernecu@yahoo.com.ar'},
    /*{id: 6, nombre: 'Fernando', apellido: 'Furlan', email: 'ferfu@outlook.com'},
    {id: 7, nombre: 'Gabriela', apellido: 'Lorenzon', email: 'gabi@gmail.com'},
    {id: 8, nombre: 'Hilario', apellido: 'Cuestas', email: 'hilari@outlook.com'},*/
  ];

@Injectable({ providedIn: 'root' })
export class AlumnosService {
    getAlumnos$(): Observable<Alumno[]> {
        const alumnosObservable = new Observable<Alumno[]>((observer) => {
          setTimeout(() => {
            observer.next(ALUMNOS); // Emit the data
            observer.complete(); // Complete the observable after emitting the data
          }, 500);// Simulate a 1/2 second delay
        });
        return alumnosObservable;
    }
}