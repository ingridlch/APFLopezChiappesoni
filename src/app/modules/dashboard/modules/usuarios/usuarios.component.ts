import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuariosService } from './usuarios.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { User,UserForm } from '../../../../core/models';
import { Store } from '@ngrx/store';
import { UsuariosActions } from './store/usuarios.actions';
import { selectUsuarios, selectUsuariosError, selectUsuariosLoading } from './store/usuarios.selectors';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {
  usuarioForm: FormGroup;
  idActual: string = '';
  //isLoading = false;
  usuarios : User[] = [];
  usuariosSubscription: Subscription | null = null; // Subscription to manage the observable
  authUser$: Observable<User | null>;

  usuarios$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  
  constructor(private fb: FormBuilder, private usuariosService: UsuariosService, 
      private authService: AuthService, private store: Store){
    this.authUser$ = this.authService.authUser$;
    //this.loadUsuariosObservable();
    this.usuarioForm = this.fb.group({
      id: '',
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      role: ['', [Validators.required]],
      token: [''],
    });
    this.usuarios$ = this.store.select(selectUsuarios);
    this.loading$ = this.store.select(selectUsuariosLoading);
    this.error$ = this.store.select(selectUsuariosError);
  }

  loadUsuariosObservable() {
    //this.isLoading = true;
    this.usuariosSubscription = this.usuariosService
      .get$()
      .subscribe({
        next: (datos) => {
          this.usuarios = datos;
        },
        error: (error) => {},
        complete: () => {
          //this.isLoading = false;
        },
      });
  }

  ngOnInit(): void {
    this.store.dispatch(UsuariosActions.loadUsuarios());
  }

  onSubmit(){
    if (this.usuarioForm.invalid) {
      alert('Complete todos los valores del formulario correctamente');
      return;
    }  
    if(this.idActual===''){
      const { id, ...newUser } = this.usuarioForm.value;
      newUser.token = crypto.randomUUID();
      this.usuariosService.create(newUser).subscribe({
        next: (response) => {
          this.usuarios = [...this.usuarios, response];
        },
        error: (error) => {},
        complete: () => {},
      });
    } else {
      //edita
      const user = this.usuarioForm.value;
      this.usuariosService.update(this.idActual,user).subscribe({
        next: (response) => {
          this.usuarios = response;
        },
      });
    }

    this.idActual = '';
    this.usuarioForm.reset();
  }

  onDeleteUsuario(id:number | string){
    if(confirm('¿Está seguro de eliminar el usuario?')){
      this.usuariosService.delete(id.toLocaleString()).subscribe({
        next: (response) => {
          this.usuarios = response;
        },
      });
    }
  }

  onEditUsuario(user:User){
    this.idActual = user.id;
    this.usuarioForm.patchValue(user)
  }

}
