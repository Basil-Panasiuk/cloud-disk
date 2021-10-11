import React, { useState } from 'react';
import './navbar.css';
import Logo from '../../assets/img/navbar-logo.svg';
import { NavLink } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/userReducer';
import { getFiles, searchFiles } from '../../actions/file';
import { showLoader } from '../../reducers/appReducer';
import avatarLogo from '../../assets/img/avatar.svg';
import { API_URL } from '../../config';

const Navbar = () => {
    const { isAuth, currentUser } = useTypedSelector(state => state.user);
    const { currentDir } = useTypedSelector(state => state.files);
    const dispatch = useDispatch();
    const [searchName, setSearchName] = useState<string>('')
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo;
    

    const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.target.value);
        dispatch(showLoader())

        if(e.target.value !== '') {
            setTimeout((value) => {
                dispatch(searchFiles(value));
            }, 500, e.target.value)
        } else {
            dispatch(getFiles(currentDir))
        }
    }

    return (
        <div className="navbar">
            <div className="container">
            <img src={Logo} alt="logo" className="navbar_logo" />
            <div className="navbar__header">MERN CLOUD</div>
            {!isAuth && <div className="navbar__login">
                <NavLink to="/login">Войти</NavLink>
            </div>}
            {!isAuth && <div className="navbar__registration">
                <NavLink to="/registration">Регистрация</NavLink>
            </div>}
            {isAuth && <input 
                value={searchName}
                onChange={searchChangeHandler}
                type="text"
                className="navbar__search" 
                placeholder="Название файла..."
            />}
            {isAuth && 
            <div 
                onClick={() => dispatch(logout())}
                className="navbar__login"
                >
                    Выход
            </div>}
            {isAuth &&
                    <img 
                        src={avatar} 
                        alt="avatar" 
                        className="navbar__avatar"
                    />
            }
        </div>
            
        </div>
    );
};

export default Navbar;