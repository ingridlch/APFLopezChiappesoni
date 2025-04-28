import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from '../models';

@Pipe({
  name: 'alumnoNombreApellido',
  standalone: false
})
export class AlumnoNombreApellidoPipe implements PipeTransform {

  transform(value: Alumno, ...args: unknown[]): unknown {
    return value.nombre+' '+value.apellido;
  }

}
