import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/user';
import Input from '../../utils/input/Input';
import './registration.css';

const Login: FC = () => {
    const [email, setEmail] = useState<string>("user@gmail.com");
    const [password, setPassword] = useState<string>("user");
    const dispatch = useDispatch();

    return (
        <div className="registration">
            <div className="registration__header">Авторизация</div>
            <Input value={email} setValue={setEmail} type="input" placeholder="Input email" />
            <Input value={password} setValue={setPassword} type="password" placeholder="Input password" />
            <button 
                onClick={() => dispatch(login(email, password))}
                className="registration__btn" 
            >Войти</button>
        </div>
    );
};

export default Login;