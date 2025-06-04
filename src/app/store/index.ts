import { ActionReducerMap } from "@ngrx/store";
import { userReducer, UserState } from "./user/user.reducer";
import { titleReducer, TitleState } from "./title/title.reducer";

interface AppState {
    user: UserState
    title: TitleState
}

export const appReducer: ActionReducerMap<AppState> = {
    user: userReducer,
    title: titleReducer,
}