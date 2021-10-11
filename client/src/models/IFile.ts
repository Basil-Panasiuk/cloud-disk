export interface IFile {
    name: string;
    type: string;
    accessLink?: string;
    size?: string;
    path?: string;
    date?: string;
    user?: object;
    parent?: object;
    childs?: object;
    _id: string;
}