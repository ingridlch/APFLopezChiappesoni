import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../../../../core/models';

export const UsuariosActions = createActionGroup({
  source: 'Usuarios',
  events: {
    // Acciones sin argumentos, usamos emptyProps
    'Load Usuarios': emptyProps(),
    // Accion satisfactoria
    'Load Usuarios Success': props<{ usuarios: User[] }>(),
    // Accion de error
    'Load Usuarios Failure': props<{ error: string }>(),

    'Load Usuario By Id': props<{ id: string }>(),
  },
});