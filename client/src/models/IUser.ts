export interface IUser {
    email: string;
    password: string;
    diskSpace: number;
    usedSpace: number;
    avatar: string;
    files: object;
    id: string;
}