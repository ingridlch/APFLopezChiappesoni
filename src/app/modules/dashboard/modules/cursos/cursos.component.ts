import { Component } from '@angular/core';
import { Curso } from './models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CursosService } from './cursos.service';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models';

@Component({
  selector: 'app-cursos',
  standalone: false,
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent {
  cursoForm: FormGroup;
  idActual: string = '';
  cursos: Curso[] = [];
  isLoading = false;
  cursosSubscription: Subscription | null = null; // Subscription to manage the observable
  authUser$: Observable<User | null>;

  constructor(private fb: FormBuilder, private cursosService: CursosService, private authService: AuthService){
    this.authUser$ = this.authService.authUser$;  
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
          error: (error) => {},
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
      if(this.idActual===''){
        //nuevo
        /*const newCurso = this.cursoForm.value;
        newCurso.id = (this.cursos.length>0) ? this.cursos[this.cursos.length - 1].id + 1 : 1; 
        this.cursos = [...this.cursos, newCurso];*/

        const { id, ...newCurso } = this.cursoForm.value;
        this.cursosService.create(newCurso).subscribe({
          next: (response) => {
            this.cursos = [...this.cursos, response];
          },
          error: (error) => {},
          complete: () => {},
        });
      } else {
        //edita
        //this.cursos = this.cursos.map((el) => el.id === this.idActual ? { ...el, ...this.cursoForm.value } : el);
        const curso = this.cursoForm.value;
        this.cursosService.update(this.idActual,curso).subscribe({
          next: (response) => {
            this.cursos = response;
          },
        });
      }
  
      this.idActual = '';
      this.cursoForm.reset();
    }
  
    onDeleteCurso(id:number){
      if(confirm('¿Está seguro de eliminar el curso?')){
        //this.cursos = this.cursos.filter((el)=>el.id!==id);
        this.cursosService.delete(id.toLocaleString()).subscribe({
          next: (response) => {
            this.cursos = response;
          },
        });
      }
    }
  
    onEditCurso(curso:Curso){
      this.idActual = curso.id;
      this.cursoForm.patchValue(curso)
    }
}
