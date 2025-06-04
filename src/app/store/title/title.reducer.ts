import { createReducer, on } from "@ngrx/store";
import { setTitle } from "./title.actions";

export interface TitleState {
    title: string;
}

const initialState ={
    title: '',
}

export const titleReducer = createReducer<TitleState>(
    initialState, 
    // con la funcion setTitle se setea titulo
    on(setTitle, (state, { title }) => ({ ...state, title }))
);

