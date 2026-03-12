export enum EROLES {
    USER = 'user',
    ADMIN = 'admin'
}
export interface UserDBO {
    id : number,
    username : string,
    password : string,
    role : EROLES,
    email : string,
    last_name : string,
    first_name : string,
}
export interface User{
    id : number,
    username : string,
    password : string,
    role : EROLES,
    email : string,
    lastName : string,
    firstName : string,
}
export interface UserDTO {
    id : number,
    username : string,
    password ?: string,
    role : EROLES,
    email : string,
    lastName : string,
    firstName : string,

}
export interface NewUser {
    //id : number,
    userName : string,
    password : string,
    role : EROLES,
    email : string,
    lastName : string,
    firstName : string;
}
export interface NewUserDTO {
    username : string,
    password : string,
    role : EROLES,
    email : string,
    lastName : string,
    firstName : string,
}

export interface AuthentificatedUser {
    username : string,
    token : string,
}