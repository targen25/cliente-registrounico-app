export interface User {
    id: number;
    username: string;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    token: string;
}
export interface UsernamePasswordCredentials {
    username : string;
    password: string;
}

export interface UserResponse extends User { }

export interface UserRequest extends User {
    password: string;
}

export type UserCreateRequest = Omit<UserRequest, 'token' | 'id'>;