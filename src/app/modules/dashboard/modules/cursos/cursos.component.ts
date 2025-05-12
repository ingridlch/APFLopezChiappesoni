import { Component } from '@angular/core';
import { Curso } from './models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  standalone: false,
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent {
  cursoForm: FormGroup;
  idActual: number = 0;
  cursos: Curso[] = [];
  isLoading = false;
  cursosSubscription: Subscription | null = null; // Subscription to manage the observable

  constructor(private fb: FormBuilder, private cursosService: CursosService){
      this.loadCursosObservable();
      this.cursoForm = this.fb.group({
        id: 0,
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        descripcion: [''],
        clases: [[]],
      })
    }

    loadCursosObservable() {
      this.isLoading = true;
      this.cursosSubscription = this.cursosService
        .getCursos$()
        .subscribe({
          next: (datos) => {
            this.cursos = datos;
          },
          error: (error) => console.error(error),
          complete: () => {
            this.isLoading = false;
          },
        });
    }
  
    onSubmit(){
      if (this.cursoForm.invalid) {
        alert('Complete todos los valores del formulario correctamente');
        return;
      }  
      if(this.idActual===0){
        //nuevo
        const newCurso = this.cursoForm.value;
        newCurso.id = (this.cursos.length>0) ? this.cursos[this.cursos.length - 1].id + 1 : 1; 
        this.cursos = [...this.cursos, newCurso];
      } else {
        //edita
        this.cursos = this.cursos.map((el) => el.id === this.idActual ? { ...el, ...this.cursoForm.value } : el);
      }
  
      this.idActual = 0;
      this.cursoForm.reset();
    }
  
    onDeleteCurso(id:number){
      console.log('Se elimina curso '+id)
      if(confirm('¿Está seguro de eliminar el curso?')){
        this.cursos = this.cursos.filter((el)=>el.id!==id);
      }
    }
  
    onEditCurso(curso:Curso){
      this.idActual = curso.id;
      console.log('Se edita el curso '+curso.id)
      this.cursoForm.patchValue(curso)
    }
}
