import { IUserGoogle } from '@/components/shared/JoinGoogle/helpers/formatToInterfaceIUser';
import { ToastAndroid } from 'react-native';
import { responseGoogleInfoUser } from './responseGoogleInfoUser';


/**
 * Получение информации о пользователе Google.
 * @param token Токен для авторизации.
 */
export const getUserInfo = async (token: string): Promise<IUserGoogle | null> => {
    if (!token) return null;
    try {
        const userFormatToInterfaceIUser: IUserGoogle | null = await responseGoogleInfoUser(token);
        console.log(userFormatToInterfaceIUser);
        if(!userFormatToInterfaceIUser) {
            ToastAndroid.show('Не верный формат пользователя. Попробуйте еще раз или войдите через Email.', ToastAndroid.LONG);
            return null;
        }

        return userFormatToInterfaceIUser;

    } catch (error) {
        ToastAndroid.show('Непредвиденная ошибка регистрации.', ToastAndroid.LONG);
        return null;
    }
};