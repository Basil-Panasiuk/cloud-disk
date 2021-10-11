import axios from "axios"
import { API_URL } from "../config"
import { AppDispatch } from "../reducers"
import { setUser } from "../reducers/userReducer"

export const registration = async (email: string, password: string) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/registration`, {
            email,
            password
        })
        alert(response.data.message)
    } catch (e) {
        alert('Проверьте валидность логина и пароля.\nВозможно такой пользователь уже существует\nИли можете войти под user')
    }
}

export const login = (email: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/login`, {
                email,
                password
            })
            localStorage.setItem('token', response.data.token)
            dispatch(setUser(response.data.user))
        } catch (e) {
            alert('Проверьте логин или пароль')
        }
    }   
}

export const auth = () => {
    return async (dispatch: AppDispatch) => {
        try {
            if(localStorage.getItem('token')) {
                const response = await axios.get(`http://localhost:5000/api/auth/auth`, 
                    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
                );
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.token)
            }
            
        } catch (e) {
            //alert('Упсccc')
            localStorage.removeItem('token')
        }
    }   
}

export const uploadAvatar = (file: Blob) => {
    return async (dispatch: AppDispatch) => {
        try {
                const formData = new FormData();
                formData.append('file', file);
                const response = await axios.post(`${API_URL}api/files/avatar`, formData, 
                    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
                );
                dispatch(setUser(response.data))
            } catch (e) {
                console.log(e);
                
        }
    }   
}

export const deleteAvatar = () => {
    return async (dispatch: AppDispatch) => {
        try {
                const response = await axios.delete(`${API_URL}api/files/avatar`, 
                    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
                );
                dispatch(setUser(response.data))
            } catch (e) {
                console.log(e);
                
        }
    }   
}