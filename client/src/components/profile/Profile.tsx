import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteAvatar, uploadAvatar } from '../../actions/user';

const Profile = () => {
    const dispatch = useDispatch();

    const deleteHandler = () => {
        dispatch(deleteAvatar());
    }
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.files) {
            const file = e.currentTarget.files[0];
            dispatch(uploadAvatar(file));
        }
    }

    return (
        <div>
            <button
                onClick={deleteHandler}
            >Удалить аватар</button>
            <input 
                type="file" 
                accept="image/*"
                onChange={changeHandler}
                placeholder="загрузить аватар" 
            />
            <NavLink to="/disk">к файлам</NavLink>
        </div>
    );
};

export default Profile;