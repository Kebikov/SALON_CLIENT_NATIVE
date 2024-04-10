
export type TRole = 'admin' | 'master' | 'client';
export type TtypeAuth = 'Google' | 'Email';

/**
 * Входяший boby на регистрацию нового пользователя.
 * req.body 
 */
export interface IDataRegistration {
    /**
     * Почта пользователя.
     */
    email: string;
    /**
     * Пароль пользователя.
     */
    password: string;
    /**
     * Роль пользователя.
     */
    role: TRole;
    /**
     * Тип регистрации пользователя.
     */
    typeAuth: TtypeAuth;
    /**
     * Аватарка пользователя.
     */
    picture?: string;
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





