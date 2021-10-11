
export interface AppState {
    loader: boolean;
}

export enum AppActionEnum {
    SHOW_LOADER = "SHOW_LOADER",
    HIDE_LOADER = "HIDE_LOADER",
}

export interface ShowLoaderAction {
    type: AppActionEnum.SHOW_LOADER;
}
export interface HideLoaderAction {
    type: AppActionEnum.HIDE_LOADER;
}

export type AppAction = 
    ShowLoaderAction |
    HideLoaderAction;