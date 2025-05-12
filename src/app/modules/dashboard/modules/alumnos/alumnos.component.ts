import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Alumno } from './models';
import { AlumnosService } from './alumnos.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-alumnos',
  standalone: false,
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent {
  alumnoForm: FormGroup;
  idActual: number = 0;
  isLoading = false;
  alumnos : Alumno[] = [];
  alumnosSubscription: Subscription | null = null; // Subscription to manage the observable
  
  constructor(private fb: FormBuilder, private alumnosService: AlumnosService){
    this.loadAlumnosObservable();
    this.alumnoForm = this.fb.group({
      id: 0,
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  loadAlumnosObservable() {
    this.isLoading = true;
    this.alumnosSubscription = this.alumnosService
      .getAlumnos$()
      .subscribe({
        next: (datos) => {
          this.alumnos = datos;
        },
        error: (error) => console.error(error),
        complete: () => {
          this.isLoading = false;
        },
      });
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
