import { IReqBodyRegistrationEmail } from '@/api/routes/registration/types/registration.types';
import httpRegistrationService from '@/api/routes/registration/service/registration.service';
import { asyncStorageSaveUser } from '@/helpers/save/saveUserInAsyncStorage';


/**
 * - Запрос на сервер для регистрации через Email.
 * - Проверка ответа на ошибки.
 * - Сохранение данных в AsyncStorage.
 */
export const requestOnRegistration = async (body: IReqBodyRegistrationEmail) => {
    const result = await httpRegistrationService.POST_registrationEmail(body);
    if(!result) return;
    await asyncStorageSaveUser(result);
    return true;
}

