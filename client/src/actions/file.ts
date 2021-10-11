import axios from 'axios';
import { IFile } from '../models/IFile';
import { AppDispatch } from '../reducers';
import { hideLoader, showLoader } from '../reducers/appReducer';
import { addFile, deleteFileAction, setFiles } from '../reducers/fileReducer';
import { addUploadFile, changeUploadFile, showUploader } from '../reducers/uploadReducer';

export function getFiles(dirId: string | null, sort?: string) {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(showLoader());
            let url = `http://localhost:5000/api/files`;

            if(dirId && dirId.length > 1) {
                url = `http://localhost:5000/api/files?parent=${dirId}`;
            }
            if(sort) {
                url = `http://localhost:5000/api/files?sort=${sort}`;
            }
            if(dirId && sort) {
                url = `http://localhost:5000/api/files?parent=${dirId}&sort=${sort}`;
            }

            const response = await axios.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(setFiles(response.data))
            
        } catch (e: unknown) {
            if(e instanceof Error) {
                alert('getFiles')
                // console.log(e);
                
            }
        } finally {
            dispatch(hideLoader())
        }
    }
}

export function createDir(dirId: string | null , name: string) {
    return async (dispatch: AppDispatch) => {
        try {
            if(dirId === ''){
                dirId = null;
            }
            const response = await axios.post(`http://localhost:5000/api/files`, {
                name,
                parent: dirId,
                type: 'dir'
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(addFile(response.data))
            
        } catch (e: unknown) {
            if(e instanceof Error) {
               alert(e.message)
            }
        }
    }
}

export function uploadFile(file: Blob, dirId: string | null) {
    return async (dispatch: AppDispatch) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            if(dirId) {
                formData.append('parent', dirId);
            }
            const uploadFile = { name: file.name, progress: 0, id: Date.now() };
            dispatch(showUploader())
            dispatch(addUploadFile(uploadFile))
            const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength);
                    if(totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        dispatch(changeUploadFile(uploadFile))
                        
                    }
                }
            });
            dispatch(addFile(response.data))
            
        } catch (e: unknown) {
            if(e instanceof Error) {
                alert('uploadFile')
            }
        }
    }
}

export async function downloadFile (file: IFile) {
    const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    if(response.status === 200) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click()
        link.remove()
    }
}

export function deleteFile(file: IFile) {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/files?id=${file._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(deleteFileAction(file._id))
            console.log(response.data.message);
            
        } catch (e: unknown) {
            if(e instanceof Error) {
                alert('Возможно папка не пустая)')
            }
        }
    }
}

export function searchFiles(search: string) {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/files/search?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(setFiles(response.data))
        } catch (e: unknown) {
            if(e instanceof Error) {
                // alert('Возможно такого файла нет)')
            }
        } finally {
            dispatch(hideLoader())
        }
    }
}