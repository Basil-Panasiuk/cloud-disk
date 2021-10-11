import { IUser } from "../../models/IUser";

export interface UserState {
    currentUser: IUser;
    isAuth: boolean;
}

export enum UserActionEnum {
    SET_USER = "SET_USER",
    SET_LOGOUT = "SET_LOGOUT",
}

export interface SetUserAction {
    type: UserActionEnum.SET_USER;
    payload: IUser;
}
export interface SetLogoutAction {
    type: UserActionEnum.SET_LOGOUT;
}

export type UserAction = SetUserAction | SetLogoutAction;