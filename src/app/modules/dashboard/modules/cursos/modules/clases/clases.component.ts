import { Component } from '@angular/core';
import { Clase } from './models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ClasesService } from './clases.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../../../core/services/auth.service';
import { User } from '../../../../../../core/models';

@Component({
  selector: 'app-clases',
  standalone: false,
  templateUrl: './clases.component.html',
  styleUrl: './clases.component.scss'
})
export class ClasesComponent {
  claseForm: FormGroup;
  idActual: number = 0;
  cursoId: string = '';
  nombre: string = '';
  clases: Clase[] = [];
  isLoading = false;
  clasesSubscription: Subscription | null = null; // Subscription to manage the observable
  authUser$: Observable<User | null>;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private clasesService: ClasesService, private authService: AuthService){
      this.authUser$ = this.authService.authUser$;
      this.nombre = this.activatedRoute.snapshot.queryParams['nombre'];
      this.cursoId = this.activatedRoute.snapshot.params['id'];//==Number(this.activatedRoute.snapshot.params['id'])) ? Number(this.activatedRoute.snapshot.params['id']) : 0;
      //this.cursoId = (this.activatedRoute.snapshot.params['id']==Number(this.activatedRoute.snapshot.params['id'])) ? Number(this.activatedRoute.snapshot.params['id']) : 0;
      //if(this.cursoId>0) {
        this.loadClasesObservable();
      //}  
      this.claseForm = this.fb.group({
        id: 0,
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        descripcion: [''],
      })
    }

    loadClasesObservable() {
      this.isLoading = true;
      this.clasesSubscription = this.clasesService
        .getClasesByCurso(this.cursoId)
        .subscribe({
          next: (datos) => {
            this.clases = datos;
          },
          error: (error) => console.error(error),
          complete: () => {
            this.isLoading = false;
          },
        });
    }
  
    onSubmit(){
      if (this.claseForm.invalid) {
        alert('Complete todos los valores del formulario correctamente');
        return;
      }  
      if(this.idActual===0){
        //nuevo
        const newClase = this.claseForm.value;
        newClase.id = (this.clases.length>0) ? this.clases[this.clases.length - 1].id + 1 : 1; 
        this.clases = [...this.clases, newClase];
      } else {
        //edita
        this.clases = this.clases.map((el) => el.id === this.idActual ? { ...el, ...this.claseForm.value } : el);
      }
  
      this.idActual = 0;
      this.claseForm.reset();
    }
  
    onDeleteClase(id:number){
      console.log('Se elimina clase '+id)
      if(confirm('¿Está seguro de eliminar la clase?')){
        this.clases = this.clases.filter((el)=>el.id!==id);
      }
    }
  
    onEditClase(clase:Clase){
      this.idActual = clase.id;
      console.log('Se edita la clase '+clase.id)
      this.claseForm.patchValue(clase)
    }

    volverACursos() {
      this.router.navigate(['/dashboard/cursos']);
    }
}
