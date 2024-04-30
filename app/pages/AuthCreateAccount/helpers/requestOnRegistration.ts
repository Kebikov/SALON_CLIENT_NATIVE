import { IReqBodyRegistrationEmail } from '@/axios/routes/registration/types/registration.types';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import httpRegistrationService from '@/axios/routes/registration/service/registration.service';
import { checkErrorResponce } from '@/axios/helpers/checkErrorResponce';
import { asyncStorageSaveUser } from '@/helpers/save/saveUserInAsyncStorage';

/**
 * - Запрос на сервер для регистрации через Email.
 * - Проверка ответа на ошибки.
 * - Сохранение данных в AsyncStorage.
 */
export const requestOnRegistration = async (body: IReqBodyRegistrationEmail) => {
    const result = await httpRegistrationService.POST_registrationEmail(body);
    if(checkErrorResponce(result)) return;
    await asyncStorageSaveUser(result);
    return true;
}

