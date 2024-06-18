export type TRole = 'admin' | 'master' | 'client';

/** 
 * @table registration
 * @param email - Email пользователя.
 * @param password - Пароль пользователя.
 * @param role - Роль пользователя.
 * @param activationId - id для подтверждения почты.
 * @param isActivated - Флаг активации учетной записи (0 - не активирована, 1 - активирована).
 */
export interface IRegistration {
    email: string;
    password: string;
    role: TRole;
    activationId: string;
    isActivated: number;
}



/**
 * Входяший boby на регистрацию нового пользователя через Google.
 * @param name Имя.
 * @param picture Аватарка пользователя.
 */
export interface IReqBodyRegistrationGoogle extends Pick<IRegistration, 'email' | 'password' > {
    name: string;
    picture: string;
}

/**
 * Входяший boby на регистрацию нового пользователя через Email.
 * @param name Имя.
 * @param picture Аватарка пользователя.
 */
export interface IReqBodyRegistrationEmail extends Pick<IRegistration, 'email' | 'password'> {
    name: string;
    phone: string;
}

/**
 * Данные для обновления токена.
 * @param id - id пользователя.
 */
export interface IreqUpdateToken {
    id: number; 
    accessToken: string;
    refreshToken: string;
}

/**
 * Ответ сервера клиенту после регистрации.
 */
export interface IResRegistration {
    id: number; 
    accessToken: string;
    refreshToken: string; 
    expiresIn: number;
}

/**
 * Обьект ошибки.
 */
export interface IError {
    error: string;
    discription: string;
}











