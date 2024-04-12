import { IDataRegistration, IResRegistration, IErrors } from "@/axios/types/registration.types";
import { httpRegistration } from "@/axios/paths";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { IUserGoogle } from "./formatToInterfaceIUser";


interface IData {
    data: IResRegistration | IErrors;
}

/**
 * Регистрация пользователя на сервере.
 * @param {IUserGoogle} user обьект пользователя
 * @returns 
 */
export const registrationUserOnTheServer = async (user: IUserGoogle) => {

    const body: IDataRegistration = {
        email: user.email,
        password: user.id,
        role: 'client',
        typeAuth: 'Google',
        picture: user.picture
    };

    const {data}: IData = await httpRegistration.post('/', body);

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
}