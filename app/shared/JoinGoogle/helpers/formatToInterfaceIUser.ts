/**
 * Пользователь.
 * @param id Id Пользователя.
 * @param email Email пользователя.
 * @param name Имя пользователя.
 * @param picture Аватар пользователя.
 */
export interface IUserGoogle {
    id: string;
    email: string;
    name: string;
    picture: string;
}

/**
 * Проверка и создание обьекта пользователя с interface IUserGoogle.
 */
export const formatToInterfaceIUserGoogle = (user: unknown): IUserGoogle | null  => {
    if(typeof user === 'object' && user !== null) {
        if(
            'id' in user && typeof user.id === 'string' &&
            'email' in user && typeof user.email === 'string' &&
            'name' in user && typeof user.name === 'string' &&
            'picture' in user && typeof user.picture === 'string' 
        ) {
            const newUser: IUserGoogle = {
                id: user.id,
                email: user.email,
                name: user.name,
                picture: user.picture
            }
            return newUser;
        } else {
            return null;
        }
    } else {
        return null;
    }
}