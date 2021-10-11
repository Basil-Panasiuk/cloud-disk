import React, {FC} from 'react';
import { IFile } from '../../../../models/IFile';
import './file.css';
import dirLogo from '../../../../assets/img/dir.svg';
import fileLogo from '../../../../assets/img/file.svg';
import { useDispatch } from 'react-redux';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { deleteFile, downloadFile } from '../../../../actions/file';
import sizeFormat from '../../../../utils/sizeFormat';

interface FileProps {
    file: IFile;
}

const File: FC<FileProps> = ({file}) => {
    const dispatch = useDispatch();
    const currentDir = useTypedSelector(state => state.files.currentDir)
    const fileView = useTypedSelector(state => state.files.view)

    function openHandler(file: IFile) {
        if(file.type === 'dir') {
            dispatch(setCurrentDir(file._id))
            dispatch(pushToStack(currentDir))
        }
    }

    function downloadClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        downloadFile(file);
    }
    function deleteClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        dispatch(deleteFile(file))
    }

    if(fileView === 'list') {
        return (
            <div className="file" onClick={() => openHandler(file)}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img" />
                <div className="file__name">{file.name}</div>
                <div className="file__date">{file.date?.slice(0, 10)}</div>
                <div className="file__size">{
                    file.size &&
                    sizeFormat(file.size)
                }</div>
                {file.type !== 'dir' && <button 
                    className="file__btn file__download"
                    onClick={downloadClickHandler}
                ></button>}
                <button 
                    className="file__btn file__delete"
                    onClick={deleteClickHandler}
                ></button>
            </div>
        );
    }
    if(fileView === 'plate') {
        return (
            <div className="file-plate" onClick={() => openHandler(file)}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file-plate__img" />
                <div className="file-plate__name">{file.name}</div>
                <div className="file-plate__btns">
                    {file.type !== 'dir' && <button 
                        className="file-plate__btn file-plate__download"
                        onClick={downloadClickHandler}
                    ></button>}
                    <button 
                        className="file-plate__btn file-plate__delete"
                        onClick={deleteClickHandler}
                    ></button>
                </div>
            </div>
        );
    }

    return <div>gg</div>
    
};

export default File;

