import httpRegistrationService from '@/api/routes/registration/service/registration.service';
import { IReqBodyRegistrationGoogle, IResRegistration, IError } from "@/api/routes/registration/types/registration.types";
import { IUserGoogle } from "./formatToInterfaceIUser";
import { asyncStorageSaveUser } from '@/helpers/save/saveUserInAsyncStorage';


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
    if(!result) return;
    await asyncStorageSaveUser(result);

    return true;
}