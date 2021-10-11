import { IFile } from "../models/IFile";
import { AddFileAction, DeleteFileAction, FileAction, FileActionEnum, FileState, PushToStackAction, SetCurrentDirAction, SetFilesAction, SetPopupDisplayAction, SetViewAction } from "./types/file";

const defaultState: FileState = {
    files: [] as IFile[],
    currentDir: '',
    popupDisplay: 'none',
    dirStack: [],
    view: 'list',
}

export default function fileReducer(state = defaultState, action: FileAction): FileState {
    switch (action.type) {
        case FileActionEnum.SET_FILES:
            return {...state, files: action.payload}
        case FileActionEnum.SET_CURRENT_DIR:
            return {...state, currentDir: action.payload}
        case FileActionEnum.ADD_FILE:
            return {...state, files: [...state.files, action.payload]}
        case FileActionEnum.SET_POPUP_DISPLAY:
            return {...state, popupDisplay: action.payload}
        case FileActionEnum.PUSH_TO_STACK:
            return {...state, dirStack: [...state.dirStack, action.payload]}
        case FileActionEnum.DELETE_FILE:
            return {...state, files: [...state.files.filter((file: IFile) => file._id !== action.payload)]}
        case FileActionEnum.SET_VIEW:
            return {...state, view: action.payload}
        default:
            return state;
    }
}

export const setFiles = (files: IFile[]): SetFilesAction => ({type: FileActionEnum.SET_FILES, payload: files})
export const setCurrentDir = (dir: string): SetCurrentDirAction => ({type: FileActionEnum.SET_CURRENT_DIR, payload: dir})
export const addFile = (file: IFile): AddFileAction => ({type: FileActionEnum.ADD_FILE, payload: file})
export const setPopupDisplay = (display: string): SetPopupDisplayAction => ({type: FileActionEnum.SET_POPUP_DISPLAY, payload: display})
export const pushToStack = (dir: string): PushToStackAction => ({type: FileActionEnum.PUSH_TO_STACK, payload: dir})
export const deleteFileAction = (dirId: string): DeleteFileAction => ({type: FileActionEnum.DELETE_FILE, payload: dirId})
export const setFileView = (payload: string): SetViewAction => ({type: FileActionEnum.SET_VIEW, payload})