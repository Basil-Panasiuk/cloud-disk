import React, { FC, useState } from 'react';
import { registration } from '../../actions/user';
import Input from '../../utils/input/Input';
import './registration.css';

const Registration: FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <div className="registration">
            <div className="registration__header">Регистрация</div>
            <Input value={email} setValue={setEmail} type="input" placeholder="Input email" />
            <Input value={password} setValue={setPassword} type="password" placeholder="Input password" />
            <button 
                className="registration__btn" 
                onClick={() => registration(email, password)}
            >Зарегистрироваться</button>
        </div>
    );
};

export default Registration;