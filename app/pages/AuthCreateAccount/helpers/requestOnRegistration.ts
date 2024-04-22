import { IReqBodyRegistrationEmail } from '@/axios/routes/registration/types/registration.types';
import { httpRegistration } from '@/axios/paths';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import httpRegistrationService from '@/axios/routes/registration/service/registration.service';
import { checkErrorResponce } from '@/axios/helpers/checkErrorResponce';


export const requestOnRegistration = async (body: IReqBodyRegistrationEmail) => {
    const result = await httpRegistrationService.POST_registrationEmail(body);
    if(checkErrorResponce(result)) return;

    // Расчет времени жизни аксес токена.
    result.expiresIn = result.expiresIn + new Date().getTime(); 
 
    await AsyncStorage.setItem('@user', JSON.stringify(result));

    return true;
}