import { checkErrorResponce } from '@/axios/helpers/checkErrorResponce';
import httpRegistrationService from '@/axios/routes/registration/service/registration.service';
import { IReqBodyRegistrationGoogle, IResRegistration, IError } from "@/axios/routes/registration/types/registration.types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { IUserGoogle } from "./formatToInterfaceIUser";
import { asyncStorageSaveUser } from '@/helpers/save/saveUserInAsyncStorage';


interface IData {
    data: IResRegistration | IError;
}


/**
 * Регистрация пользователя на сервере.
 * - При ошибке вернет false и выведет toast с ошибкой.
 * - При регистрации вернет true.
 * @param {IUserGoogle} user Обьект пользователя.
 * @returns {boolean}
 */
export const registrationUserOnTheServer = async (user: IUserGoogle) => {

    const body: IReqBodyRegistrationGoogle = {
        email: user.email,
        password: user.id,
        name: user.name,
        picture: user.picture
    };

    const result = await httpRegistrationService.POST_registrationGoogle(body);
    if(checkErrorResponce(result)) return;
    await asyncStorageSaveUser(result);

    return true;
}