import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsuariosActions } from './usuarios.actions';
import { catchError, concatMap, map, of } from 'rxjs';
import { UsuariosService } from '../usuarios.service';

@Injectable()
export class UsuariosEffects {
  loadUsuarios$;

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
  }
}