import { createFeature, createReducer, on } from '@ngrx/store';
import { UsuariosActions } from './usuarios.actions';
import { User } from '../../../../../core/models';

export const USUARIOS_FEATURE_KEY = 'usuarios';

export interface UsuariosState {
  usuarios: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsuariosState = {
  usuarios: [],
  loading: false,
  error: null,
};

const usuariosReducer = createReducer(
  initialState,
  on(UsuariosActions.loadUsuarios, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(UsuariosActions.loadUsuariosSuccess, (state, action) => {
    return {
      ...state,
      usuarios: action.usuarios,
      loading: false,
      error: null,
    };
  }),
  on(UsuariosActions.loadUsuariosFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      usuarios: [],
      error: action.error,
    };
  })
);

export const usuariosFeature = createFeature({
  name: USUARIOS_FEATURE_KEY,
  reducer: usuariosReducer,
});
