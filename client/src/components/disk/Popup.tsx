import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDir } from '../../actions/file';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setPopupDisplay } from '../../reducers/fileReducer';
import Input from '../../utils/input/Input';

const Popup = () => {
    const [dirName, setDirName] = useState<string>('');
    const popupDisplay = useTypedSelector(state => state.files.popupDisplay)
    const currentDir = useTypedSelector(state => state.files.currentDir)
    
    const dispatch = useDispatch();

    function createHandler(): void {
        dispatch(createDir(currentDir, dirName));
        setDirName('');
        dispatch(setPopupDisplay('none'));
    }

    return (
        <div 
            onClick={() => dispatch(setPopupDisplay('none'))}
            className="popup" 
            style={{display: popupDisplay}}
        >
            <div className="popup__content" onClick={(e) => e.stopPropagation()}>
                <div className="popup__header">
                    <div className="popup__title">Создать новую папку</div>
                    <button 
                        onClick={() => dispatch(setPopupDisplay('none'))}
                        className="popup__close"
                    >X</button>
                </div>
                <Input type="text" placeholder="Введите название папки" value={dirName} setValue={setDirName} />
                <button 
                    onClick={() => createHandler()}
                    className="popup__create"
                >Создать</button>
            </div>
        </div>
    );
};

export default Popup;


