export enum UserType {
    ADMIN = 'ADMIN',
    USER = 'USER'
}


export interface UserDto {
    name: string,
    email: string,
    type: string,
    password: string
}