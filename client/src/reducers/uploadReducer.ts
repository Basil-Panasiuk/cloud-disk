import { AddFile, AddUploadFileAction, ChangeUploadFileAction, HideUploaderAction, RemoveUploadFileAction, ShowUploaderAction, UploadAction, UploadActionEnum, UploadState } from "./types/upload";


const defaultState: UploadState = {
    isVisible: false,
    files: [],
}

export default function uploadReducer(state = defaultState, action: UploadAction): UploadState {
    switch (action.type) {
        case UploadActionEnum.SHOW_UPLOADER:
            return {
                ...state,
                isVisible: true,
            }
        case UploadActionEnum.HIDE_UPLOADER:
            return {
                ...state,
                isVisible: false,
            }
        case UploadActionEnum.ADD_UPLOAD_FILE:
            return {
                ...state,
                files: [...state.files, action.payload]
            }
        case UploadActionEnum.REMOVE_UPLOAD_FILE:
            return {
                ...state,
                files: [...state.files.filter((file) => file.id !== action.payload)]
            }
        case UploadActionEnum.CHANGE_UPLOAD_FILE:
            return {
                ...state,
                files: [...state.files.map(file => file.id === action.payload.id
                    ? { ...file, progress: action.payload.progress }
                    : { ...file }
                    )]
            }
        default:
            return state;
    }
}

export const showUploader = (): ShowUploaderAction => ({type: UploadActionEnum.SHOW_UPLOADER, payload: true})
export const hideUploader = (): HideUploaderAction => ({type: UploadActionEnum.HIDE_UPLOADER, payload: false})
export const addUploadFile = (file: AddFile): AddUploadFileAction => ({type: UploadActionEnum.ADD_UPLOAD_FILE, payload: file})
export const removeUploadFile = (fileId: number): RemoveUploadFileAction => ({type: UploadActionEnum.REMOVE_UPLOAD_FILE, payload: fileId})
export const changeUploadFile = (file: AddFile): ChangeUploadFileAction => ({type: UploadActionEnum.CHANGE_UPLOAD_FILE, payload: file})