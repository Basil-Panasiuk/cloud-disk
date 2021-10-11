import { IUser } from "../models/IUser";
import { SetLogoutAction, SetUserAction, UserAction, UserActionEnum, UserState } from "./types/user";


const defaultState: UserState = {
    currentUser: {} as IUser,
    isAuth: false
}

export default function userReducer(state = defaultState, action: UserAction): UserState {
    switch (action.type) {
        case UserActionEnum.SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
            }
        case UserActionEnum.SET_LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {} as IUser,
                isAuth: false,
            }
        default:
            return state;
    }
}

export const setUser = (user: IUser): SetUserAction => ({type: UserActionEnum.SET_USER, payload: user})
export const logout = (): SetLogoutAction => ({type: UserActionEnum.SET_LOGOUT})