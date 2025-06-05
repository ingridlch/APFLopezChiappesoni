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

    // Agregar usuario
    'Add Usuario': props<{ usuario: User }>(),
    'Add Usuario Success': props<{ usuario: User }>(),
    'Add Usuario Failure': props<{ error: string }>(),

    // Modificar usuario
    'Update Usuario': props<{ id: string, usuario: User }>(),
    'Update Usuario Success': props<{ usuario: User }>(),
    'Update Usuario Failure': props<{ error: string }>(),

    // Eliminar usuario
    'Delete Usuario': props<{ id: string }>(),
    'Delete Usuario Success': props<{ usuario: User }>(),
    'Delete Usuario Failure': props<{ error: string }>(),

    'Load Usuario By Id': props<{ id: string }>(),
  },
});