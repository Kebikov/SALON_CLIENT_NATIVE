import { formatToInterfaceIUserGoogle, IUserGoogle } from '@/shared/JoinGoogle/helpers/formatToInterfaceIUser';
import { ToastAndroid } from 'react-native';
import { IDataRegistration, IResRegistration, IErrors } from '@/axios/types/registration';
import { httpRegistration } from '@/axios/paths';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface IData {
    data: IResRegistration | IErrors;
}


/**
 * Получение информации о пользователе Google.
 * @param token Токен для авторизации.
 */
export const getUserInfo = async (token: string): Promise<boolean | undefined> => {
    if (!token) return false;
    try {
        const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${token}` }
        });

        const user = await response.json();
        const userFormatToInterfaceIUser: IUserGoogle | null = formatToInterfaceIUserGoogle(user);
        if(!userFormatToInterfaceIUser) {
            ToastAndroid.show('Не верный формат пользователя. Попробуйте еще раз или войдите через Email.', ToastAndroid.LONG);
            return false;
        }
        //: registration
        const body: IDataRegistration = {
            email: userFormatToInterfaceIUser.email,
            password: userFormatToInterfaceIUser.id,
            role: 'client',
            typeAuth: 'Google',
            picture: userFormatToInterfaceIUser.picture
        }
        console.log(body);
        const {data}: IData = await httpRegistration.post('/', body);
        console.log(data);
        if("errors" in data) {
            if(Array.isArray(data.errors) && 'msg' in data.errors[0]) {
                ToastAndroid.show(data.errors[0].msg, ToastAndroid.LONG);
                return false;
            }
            ToastAndroid.show('Ошибка регистрации.Попробуйте еще раз или войдите через Email.', ToastAndroid.LONG);
            return false;
        } 
        const userData: IResRegistration = data;
        await AsyncStorage.setItem('@user', JSON.stringify(userData));
        return true;
    } catch (error) {
        ToastAndroid.show('Непредвиденная ошибка регистрации.', ToastAndroid.LONG);
        console.log(error);
    }
};