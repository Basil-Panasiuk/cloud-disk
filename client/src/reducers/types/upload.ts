import { IUploadFile } from "../../components/disk/uploader/Uploader";

export interface UploadState {
    isVisible: boolean;
    files: IUploadFile[];
}
export interface AddFile {
    name: string;
    progress: number;
    id: number;
}

export enum UploadActionEnum {
    SHOW_UPLOADER = "SHOW_UPLOADER",
    HIDE_UPLOADER = "HIDE_UPLOADER",
    ADD_UPLOAD_FILE = "ADD_UPLOAD_FILE",
    REMOVE_UPLOAD_FILE = "REMOVE_UPLOAD_FILE",
    CHANGE_UPLOAD_FILE = "CHANGE_UPLOAD_FILE"
}

export interface ShowUploaderAction {
    type: UploadActionEnum.SHOW_UPLOADER;
    payload: boolean;
}
export interface HideUploaderAction {
    type: UploadActionEnum.HIDE_UPLOADER;
    payload: boolean;
}
export interface AddUploadFileAction {
    type: UploadActionEnum.ADD_UPLOAD_FILE;
    payload: AddFile;
}
export interface RemoveUploadFileAction {
    type: UploadActionEnum.REMOVE_UPLOAD_FILE;
    payload: number;
}
export interface ChangeUploadFileAction {
    type: UploadActionEnum.CHANGE_UPLOAD_FILE;
    payload: AddFile;
}


export type UploadAction = 
    ShowUploaderAction | 
    HideUploaderAction |
    AddUploadFileAction |
    RemoveUploadFileAction|
    ChangeUploadFileAction;