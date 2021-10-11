import { IFile } from "../../models/IFile";

export interface FileState {
    files: IFile[];
    currentDir: string;
    popupDisplay: string;
    dirStack: Array<string>;
    view: string;
}

export enum FileActionEnum {
    SET_FILES = "SET_FILES",
    SET_CURRENT_DIR = "SET_CURRENT_DIR",
    ADD_FILE = "ADD_FILE",
    SET_POPUP_DISPLAY = "SET_POPUP_DISPLAY",
    PUSH_TO_STACK = "PUSH_TO_STACK",
    DELETE_FILE = "DELETE_FILE",
    SET_VIEW = "SET_VIEW",
}

export interface SetViewAction {
    type: FileActionEnum.SET_VIEW;
    payload: string;
}

export interface PushToStackAction {
    type: FileActionEnum.PUSH_TO_STACK;
    payload: string;
}
export interface DeleteFileAction {
    type: FileActionEnum.DELETE_FILE;
    payload: string;
}
export interface SetFilesAction {
    type: FileActionEnum.SET_FILES;
    payload: IFile[];
}

export interface SetCurrentDirAction {
    type: FileActionEnum.SET_CURRENT_DIR;
    payload: string;
}

export interface AddFileAction {
    type: FileActionEnum.ADD_FILE;
    payload: IFile;
}

export interface SetPopupDisplayAction {
    type: FileActionEnum.SET_POPUP_DISPLAY;
    payload: string;
}

export type FileAction = 
    SetFilesAction | 
    SetCurrentDirAction | 
    AddFileAction | 
    SetPopupDisplayAction |
    PushToStackAction |
    DeleteFileAction |
    SetViewAction;