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
  }),

  // Add Usuario
  on(UsuariosActions.addUsuario, (state) => {
    return {
        ...state,
        loading: true,
        error: null,
    };
  }),
  on(UsuariosActions.addUsuarioSuccess, (state, { usuario }) => {
    return {
        ...state,
        usuarios: [...state.usuarios, usuario],
        loading: false,
        error: null,
    };
  }),
  on(UsuariosActions.addUsuarioFailure, (state, { error }) => {
    return {
        ...state,
        loading: false,
        error,
    };
  }),

  // Update Usuario
  on(UsuariosActions.updateUsuario, (state) => {
    return {
        ...state,
        loading: true,
        error: null,
    };
  }),
  on(UsuariosActions.updateUsuarioSuccess, (state, { usuario }) => {
    return {
        ...state,
        usuarios: state.usuarios.map(u => u.id === usuario.id ? usuario : u),
        loading: false,
        error: null,
    };
  }),
  on(UsuariosActions.updateUsuarioFailure, (state, { error }) => {
    return {
        ...state,
        loading: false,
        error,
    };
  }),

  // Delete Usuario
  on(UsuariosActions.deleteUsuario, (state) => {
    return {
        ...state,
        loading: true,
        error: null,
    };
  }),
  on(UsuariosActions.deleteUsuarioSuccess, (state, { usuario }) => {
    return {
        ...state,
        usuarios: state.usuarios.filter(u => u.id !== usuario.id),
        loading: false,
        error: null,
    };
  }),
  on(UsuariosActions.deleteUsuarioFailure, (state, { error }) => {
    return {
        ...state,
        loading: false,
        error,
    };
  }),


);

export const usuariosFeature = createFeature({
  name: USUARIOS_FEATURE_KEY,
  reducer: usuariosReducer,
});
