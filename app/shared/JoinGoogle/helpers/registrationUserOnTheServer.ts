import { IDataRegistrationGoogle, IResRegistration, IErrors, TtypeAuth } from "@/axios/types/registration.types";
import { httpRegistration } from "@/axios/paths";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { IUserGoogle } from "./formatToInterfaceIUser";


interface IData {
    data: IResRegistration | IErrors;
}


/**
 * Регистрация пользователя на сервере.
 * - При ошибке вернет false и выведет toast с ошибкой.
 * - При регистрации вернет true.
 * @param {IUserGoogle} user Обьект пользователя.
 * @returns {boolean}
 */
export const registrationUserOnTheServer = async (user: IUserGoogle) => {

    const body: IDataRegistrationGoogle = {
        email: user.email,
        password: user.id,
        name: user.name,
        role: 'client',
        typeAuth: 'Google',
        picture: user.picture
    };

    const {data}: IData = await httpRegistration.post('/google', body);

    if("errors" in data) {
        if(Array.isArray(data.errors) && 'msg' in data.errors[0]) {
            ToastAndroid.show(data.errors[0].msg, ToastAndroid.LONG);
            return false;
        }
        ToastAndroid.show('Ошибка регистрации.Попробуйте еще раз или войдите через Email.', ToastAndroid.LONG);
        return false;
    } 

    await AsyncStorage.setItem('@user', JSON.stringify(data));

    return true;
}