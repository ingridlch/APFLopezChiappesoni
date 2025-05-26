import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Alumno } from './models';
import { AlumnosService } from './alumnos.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models';

@Component({
  selector: 'app-alumnos',
  standalone: false,
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent {
  alumnoForm: FormGroup;
  idActual: string = '';
  isLoading = false;
  alumnos : Alumno[] = [];
  alumnosSubscription: Subscription | null = null; // Subscription to manage the observable
  authUser$: Observable<User | null>;
  
  constructor(private fb: FormBuilder, private alumnosService: AlumnosService, private authService: AuthService){
    this.authUser$ = this.authService.authUser$;
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
    if(this.idActual===''){
      //nuevo  const newAlumno = this.alumnoForm.value;
      const { id, ...newAlumno } = this.alumnoForm.value;
      //newAlumno.id = (this.alumnos.length>0) ? this.alumnos[this.alumnos.length - 1].id + 1 : 1; 
      //this.alumnos = [...this.alumnos, newAlumno];
      this.alumnosService.create(newAlumno).subscribe({
        next: (response) => {
          this.alumnos = [...this.alumnos, response];
        },
        error: (error) => console.error(error),
        complete: () => {console.log('Alumno creado exitosamente')},
      });
    } else {
      //edita
      const alumno = this.alumnoForm.value;
      this.alumnosService.update(this.idActual,alumno).subscribe({
        next: (response) => {
          this.alumnos = response;
          console.log(this.alumnos);
        },
      });
      //this.alumnos = this.alumnos.map((al) => al.id === this.idActual ? { ...al, ...this.alumnoForm.value } : al);
    }

    this.idActual = '';
    this.alumnoForm.reset();
  }

  onDeleteAlumno(id:number | string){
    console.log('Se elimina alumno '+id)
    if(confirm('¿Está seguro de eliminar el alumno?')){
      //this.alumnos = this.alumnos.filter((al)=>al.id!==id);
      this.alumnosService.delete(id.toLocaleString()).subscribe({
        next: (response) => {
          this.alumnos = response;
        },
      });
    }
  }

  onEditAlumno(alumno:Alumno){
    this.idActual = alumno.id;
    console.log('Se edita el alumno '+alumno.id)
    this.alumnoForm.patchValue(alumno)
  }
}
