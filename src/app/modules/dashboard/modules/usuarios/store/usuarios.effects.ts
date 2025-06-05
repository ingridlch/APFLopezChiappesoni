import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsuariosActions } from './usuarios.actions';
import { catchError, concatMap, map, of } from 'rxjs';
import { UsuariosService } from '../usuarios.service';

@Injectable()
export class UsuariosEffects {
  loadUsuarios$;
  addUsuario$;
  updateUsuario$;
  deleteUsuario$;

  constructor(private actions$: Actions, private usuariosService: UsuariosService) {
    this.loadUsuarios$ = createEffect(() => {
      return this.actions$.pipe(
        // Interceptar la acción de cargar usuarios
        ofType(UsuariosActions.loadUsuarios),
        // Despues de interceptar la acción, ejecutar el servicio para obtener los usuarios
        concatMap(() =>
          this.usuariosService.get$().pipe(
            // Mapear la respuesta del servicio a la acción de éxito
            map((usuarios) => UsuariosActions.loadUsuariosSuccess({ usuarios })),
            // Manejar errores y mapearlos a la acción de fallo
            catchError((error) =>
              of(UsuariosActions.loadUsuariosFailure({ error: error.message }))
            )
          )
        )
      );
    });
    
    //efecto para crear usuario
    this.addUsuario$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UsuariosActions.addUsuario),
        concatMap(({usuario}) =>
          this.usuariosService.create(usuario).pipe(
            // Mapear la respuesta del servicio a la acción de éxito
            map((usuario) => UsuariosActions.addUsuarioSuccess({ usuario })),
            // Manejar errores y mapearlos a la acción de fallo
            catchError((error) =>
              of(UsuariosActions.addUsuarioFailure({ error: error.message }))
            )
          )
        )
      )
    });

    //efecto para modificar 
    this.updateUsuario$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UsuariosActions.updateUsuario),
        concatMap(({id,usuario}) =>
          this.usuariosService.update(id,usuario).pipe(
            // Mapear la respuesta del servicio a la acción de éxito
            map((usuario) => UsuariosActions.updateUsuarioSuccess({ usuario })),
            // Manejar errores y mapearlos a la acción de fallo
            catchError((error) =>
              of(UsuariosActions.updateUsuarioFailure({ error: error.message }))
            )
          )
        )
      )
    });

    //efecto para eliminar
    this.deleteUsuario$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UsuariosActions.deleteUsuario),
        concatMap(({id}) =>
          this.usuariosService.delete(id).pipe(
            // Mapear la respuesta del servicio a la acción de éxito
            map((usuario) => UsuariosActions.deleteUsuarioSuccess({ usuario })),
            // Manejar errores y mapearlos a la acción de fallo
            catchError((error) =>
              of(UsuariosActions.deleteUsuarioFailure({ error: error.message }))
            )
          )
        )
      )
    });

  }
}