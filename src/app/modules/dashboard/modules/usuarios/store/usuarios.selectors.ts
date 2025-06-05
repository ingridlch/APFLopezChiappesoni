import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USUARIOS_FEATURE_KEY, UsuariosState } from './usuarios.reducer';

export const selectUsuariosState =
  createFeatureSelector<UsuariosState>(USUARIOS_FEATURE_KEY);

export const selectUsuarios = createSelector(
  selectUsuariosState,
  (state) => state.usuarios
);

export const selectUsuariosLoading = createSelector(
  selectUsuariosState,
  (state) => state.loading
);

export const selectUsuariosError = createSelector(
  selectUsuariosState,
  (state) => state.error
);