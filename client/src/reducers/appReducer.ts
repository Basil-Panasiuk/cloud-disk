import { AppAction, AppActionEnum, AppState, HideLoaderAction, ShowLoaderAction } from "./types/app";


const defaultState: AppState = {
    loader: false
}

export default function appReducer(state = defaultState, action: AppAction): AppState {
    switch (action.type) {
        case AppActionEnum.SHOW_LOADER:
            return {...state, loader: true}
        case AppActionEnum.HIDE_LOADER:
            return {...state, loader: false}
        default:
            return state;
    }
}

export const showLoader = (): ShowLoaderAction => ({type: AppActionEnum.SHOW_LOADER})
export const hideLoader = (): HideLoaderAction => ({type: AppActionEnum.HIDE_LOADER})
