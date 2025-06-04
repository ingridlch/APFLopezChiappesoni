import { createFeatureSelector } from "@ngrx/store";
import { TitleState } from "./title.reducer";

export const selectTitleState = createFeatureSelector<TitleState>('title');