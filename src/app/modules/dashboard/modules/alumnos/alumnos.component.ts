import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Alumno } from './models';

@Component({
  selector: 'app-alumnos',
  standalone: false,
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent {
  alumnoForm: FormGroup;
  idActual: number = 0;

  alumnos: Alumno[] = [
    {id: 1, nombre: 'Analía', apellido: 'Gervasoni', email: 'analia@gmail.com'},
    {id: 2, nombre: 'Benjamin', apellido: 'Hurtado', email: 'benja@gmail.com'},
    {id: 3, nombre: 'Cecilia', apellido: 'Alem', email: 'ceci@outlook.com'},
  ];
  
  constructor(private fb: FormBuilder){
    this.alumnoForm = this.fb.group({
      id: 0,
      nombre: [''],
      apellido: [''],
      email: [''],
    })
  }

  onSubmit(){
    if(this.idActual===0){
      //nuevo
      const newAlumno = this.alumnoForm.value;
      newAlumno.id = (this.alumnos.length>0) ? this.alumnos[this.alumnos.length - 1].id + 1 : 1; 
      this.alumnos = [...this.alumnos, newAlumno];
    } else {
      //editando
      this.alumnos = this.alumnos.map((al) => al.id === this.idActual ? { ...al, ...this.alumnoForm.value } : al);
    }
    
    console.log(this.alumnos);

    this.idActual = 0;
    this.alumnoForm.reset();
  }

  onDeleteAlumno(id:number){
    console.log('Se elimina alumno '+id)
    if(confirm('¿Está seguro de eliminar el alumno?')){
      this.alumnos = this.alumnos.filter((al)=>al.id!==id);
    }
  }

  onEditAlumno(alumno:Alumno){
    this.idActual = alumno.id;
    console.log('Se edita el alumno '+alumno.id)
    this.alumnoForm.patchValue(alumno)
  }
}
