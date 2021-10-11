import React, {ChangeEvent, FC} from 'react';
import './input.css';

interface InputProps {
    type: string;
    placeholder: string;
    value: string;
    setValue: (val: string) => void;
}

const Input: FC<InputProps> = ({ type, placeholder, value, setValue }) => {
    return (
        <input 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            value={value} 
            type={type} 
            placeholder={placeholder} 
        />
    );
};

export default Input;