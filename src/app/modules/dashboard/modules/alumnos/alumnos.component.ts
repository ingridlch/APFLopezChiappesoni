import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
    {id: 4, nombre: 'Demetrio', apellido: 'Zaragoza', email: 'demetrio@outlook.com'},
    {id: 5, nombre: 'Ernestina', apellido: 'Curuzu', email: 'ernecu@yahoo.com.ar'},
    /*{id: 6, nombre: 'Fernando', apellido: 'Furlan', email: 'ferfu@outlook.com'},
    {id: 7, nombre: 'Gabriela', apellido: 'Lorenzon', email: 'gabi@gmail.com'},
    {id: 8, nombre: 'Hilario', apellido: 'Cuestas', email: 'hilari@outlook.com'},*/
  ];
  
  constructor(private fb: FormBuilder){
    this.alumnoForm = this.fb.group({
      id: 0,
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  onSubmit(){
    if (this.alumnoForm.invalid) {
      alert('Complete todos los valores del formulario correctamente');
      return;
    }  
    if(this.idActual===0){
      //nuevo
      const newAlumno = this.alumnoForm.value;
      newAlumno.id = (this.alumnos.length>0) ? this.alumnos[this.alumnos.length - 1].id + 1 : 1; 
      this.alumnos = [...this.alumnos, newAlumno];
    } else {
      //edita
      this.alumnos = this.alumnos.map((al) => al.id === this.idActual ? { ...al, ...this.alumnoForm.value } : al);
    }

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
