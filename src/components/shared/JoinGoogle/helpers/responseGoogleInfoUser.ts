import { formatToInterfaceIUserGoogle } from "./formatToInterfaceIUser";
import { IUserGoogle } from "./formatToInterfaceIUser";


/**
 * Получение информации о пользователе Google.
 * @param {string} token Токен для авторизации
 * @example await responseGoogleInfoUser(token);
 * @returns {IUserGoogle | null}
 */
export const responseGoogleInfoUser = async (token: string): Promise<IUserGoogle | null> => {
    const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` }
    });
    
    const user = await response.json();

    const userFormatToInterfaceIUser: IUserGoogle | null = formatToInterfaceIUserGoogle(user);
    return userFormatToInterfaceIUser;
}