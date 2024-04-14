
export type TRole = 'admin' | 'master' | 'client';
export type TtypeAuth = 'Google' | 'Email';

/**
 * Входяший boby на регистрацию нового пользователя.
 * @param email Почта.
 * @param password Пароль.
 * @param name Имя.
 * @param role Роль пользователя.
 * @param typeAuth Тип регистрации пользователя.
 * @param picture Аватарка пользователя.
 */
export interface IDataRegistration {
    email: string;
    password: string;
    name: string;
    role: TRole;
    typeAuth: TtypeAuth;
}

export interface IDataRegistrationGoogle extends IDataRegistration {
    picture: string;
}

export interface IDataRegistrationEmail extends IDataRegistration {
    phone: string;
}

/**
 * req.body
 * @path '/updateToken' 
 */
export interface IreqUpdateToken {
    id: number; 
    accessToken: string;
    refreshToken: string;
}

export interface IResRegistration {
    id: number; 
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

type key = keyof IResRegistration;

export interface IresUpdate {
    id: number;
    role: TRole;
    iat: number;
}

interface IError {
    msg: string;
}

export interface IErrors {
    errors: IError[];
}





