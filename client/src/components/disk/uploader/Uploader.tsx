import React from 'react';
import UploaderFile from './UploaderFile';
import "./uploader.css";
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { hideUploader } from '../../../reducers/uploadReducer';

export interface IUploadFile {
    id: number;
    name: string;
    progress: number;
}

const Uploader = () => {
    const files = useTypedSelector(state => state.upload.files)
    const isVisible = useTypedSelector(state => state.upload.isVisible)
    const dispatch = useDispatch();

    if(isVisible) {
        return (
            <div className="uploader">
                <div className="uploader__header">
                    <div className="uploader__title">Загрузка</div>
                    <button 
                        className="uploader__close"
                        onClick={() => dispatch(hideUploader())}
                    >X</button>
                </div>
                {files.map((file) => 
                    <UploaderFile key={file.id} file={file} />
                )}
            </div>
        );
    }

    return <div></div>
};

export default Uploader;