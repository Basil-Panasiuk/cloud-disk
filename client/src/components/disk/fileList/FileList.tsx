import React from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import './fileList.css';
import File from './file/File';
import {TransitionGroup, CSSTransition} from 'react-transition-group'

const FileList = () => {
    const files = useTypedSelector(state => state.files.files)
    const fileView = useTypedSelector(state => state.files.view)

    if(files.length === 0) {
        return (
            <div className="loader">Файлы не найдены</div>
        )
    }

    if(fileView === 'list') {
        return (
            <div className="filelist">
                <div className="filelist__header">
                    <div className="filelist__name">Название</div>
                    <div className="filelist__date">Дата</div>
                    <div className="filelist__size">Размер</div>
                </div>
                <TransitionGroup>
                    {files.map((file) => 
                        <CSSTransition
                            classNames="file"
                            timeout={500}
                            key={file._id}
                            exit={false}
                        >
                            <File file={file} /> 
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </div>
        );
    }

    if(fileView === 'plate') {
        return (
            <div className="fileplate">
                    {files.map((file) => 
                        <File file={file} key={file._id} /> 
                    )}
            </div>
        );
    }

    return <div>gg</div>
    
    
};

export default FileList;