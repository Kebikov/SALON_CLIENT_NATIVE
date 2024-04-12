import { IUserGoogle } from '@/shared/JoinGoogle/helpers/formatToInterfaceIUser';
import { ToastAndroid } from 'react-native';
import { IResRegistration } from '@/axios/types/registration.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responseGoogleInfoUser } from './responseGoogleInfoUser';
import { registrationUserOnTheServer } from './registrationUserOnTheServer';


/**
 * Получение информации о пользователе Google.
 * @param token Токен для авторизации.
 */
export const getUserInfo = async (token: string): Promise<boolean | undefined> => {
    if (!token) return false;
    try {

        const userFormatToInterfaceIUser: IUserGoogle | null = await responseGoogleInfoUser(token);

        if(!userFormatToInterfaceIUser) {
            ToastAndroid.show('Не верный формат пользователя. Попробуйте еще раз или войдите через Email.', ToastAndroid.LONG);
            return false;
        }

        return await registrationUserOnTheServer(userFormatToInterfaceIUser);

    } catch (error) {
        ToastAndroid.show('Непредвиденная ошибка регистрации.', ToastAndroid.LONG);
        console.log(error);
    }
};