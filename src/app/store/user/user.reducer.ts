import { createReducer, on } from "@ngrx/store";
import { User } from "../../core/models";
import { clearUser, setUser } from "./user.actions";

export interface UserState {
    user: User | null;
}

const initialState ={
    user: null,
}

export const userReducer = createReducer<UserState>(
    initialState, 
    // con la funcion setUser se setea nuevo usuario
    on(setUser, (state, { user }) => ({ ...state, user })),
    // con la funcion clearUser se quita user (seteo usuario en null)
    on(clearUser, (state) => ({ ...state, user: null }))
);