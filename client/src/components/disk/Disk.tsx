import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFiles, uploadFile } from '../../actions/file';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import FileList from './fileList/FileList';
import './disk.css';
import Popup from './Popup';
import { setCurrentDir, setFileView, setPopupDisplay } from '../../reducers/fileReducer';
import Uploader from './uploader/Uploader';

const Disk: FC = () => {
    const dispatch = useDispatch();
    const currentDir = useTypedSelector(state => state.files.currentDir);
    const dirStack = useTypedSelector(state => state.files.dirStack);
    const [dragEnter, setDragEnter] = useState<boolean>(false);
    const [sort, setSort] = useState<string>('type');
    const loader = useTypedSelector(state => state.app.loader)

    function showPopupHandler() {
        dispatch(setPopupDisplay('flex'))
    }
    function backClickHandler(): void {
        const backDirId = dirStack.pop();
        if(backDirId === "") {
            dispatch(getFiles(''))
            dispatch(setCurrentDir(""))
        } else if(backDirId && backDirId !== "") {
            dispatch(setCurrentDir(backDirId));
        }
    }
    

    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort])

    function fileUploadHandler(event: React.ChangeEvent<HTMLInputElement>) {
        if(event.target && event ) {
            if(event.currentTarget.files) {
                let file = event.currentTarget.files[0];
                dispatch(uploadFile(file, currentDir));
            }
        }
    }

    function dragEnterHandler(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true);
    }
    function dragLeaveHandler(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(false);
    }
    function dropHandler(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        event.stopPropagation();
        let file = event.dataTransfer.files[0];
        dispatch(uploadFile(file, currentDir));
        
        setDragEnter(false);
    }

    if(loader) {
        return (
            <div className="loader">
                <div className="lds-dual-ring"></div>
            </div>
        )
    }

    return ( !dragEnter ?
        <div 
            className="disk" 
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragEnterHandler}
        >
            <div className="disk__btns">
                <button 
                    onClick={() => backClickHandler()}
                    className="disk__back btn-none"
                ></button>
                <button 
                    className="disk__create btn-none" 
                    onClick={() => showPopupHandler()}
                >Создать папку</button>
                <div className="disk__upload">
                    <label 
                        htmlFor="input-file" 
                        className="disk__upload-label"
                    >Загрузить файл</label>
                    <input 
                        type="file" 
                        multiple={true}
                        id="input-file" 
                        className="disk__upload-input" 
                        onChange={(event) => fileUploadHandler(event)}
                    />
                </div>
                <select 
                    className="disk__select" 
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="name">По имени</option>
                    <option value="type">По типу</option>
                    <option value="date">По дате</option>
                </select>
                <button className="disk__plate" 
                    onClick={() => dispatch(setFileView('plate'))}
                />
                <button className="disk__list" 
                    onClick={() => dispatch(setFileView('list'))}
                />
            </div>
            <FileList />
            <Popup />
            <Uploader />
        </div>
        : 
        <div 
            className="drop-area"
            onDrop={dropHandler}
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragEnterHandler}
        >
            Перетащите файлы сюда
        </div>
    );
};

export default Disk;



