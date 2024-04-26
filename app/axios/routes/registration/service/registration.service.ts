import { baseLink } from "@/axios/axios.interceptors";
import axios from "axios";
import { IReqBodyRegistrationEmail, IResRegistration, IReqBodyRegistrationGoogle } from '@/axios/routes/registration/types/registration.types';
import { ToastAndroid } from "react-native";
import { IError } from "@/axios/routes/registration/types/registration.types";


const path = baseLink + '/api/registration';


class HttpRegistrationService {

    /**
     * Авторизация через Email.
     * @example const result = await httpRegistrationService.POST_registrationEmail(body: IReqBodyRegistrationEmail);
     * if(checkErrorResponce(result)) return;
     */
    async POST_registrationEmail(body: IReqBodyRegistrationEmail): Promise<IResRegistration | IError | undefined> {
        try {
            const {data} = await axios.post(`${path}/email`, body);
            return data as IResRegistration | IError;
        } catch (error) {
            ToastAndroid.show('Неизвестная ошибка сервера...', ToastAndroid.SHORT);
            console.error('Error in POST_registrationEmail >>> ',error);
        }
    }
    /**
     * Авторизация через Google.
     * @example const result = await POST_registrationGoogle(body: IReqBodyRegistrationGoogle);
        if(checkErrorResponce(result)) return;
     */
        async POST_registrationGoogle(body: IReqBodyRegistrationGoogle): Promise<IResRegistration | IError | undefined> {
            try {
                const {data} = await axios.post(`${path}/google`, body);
                return data as IResRegistration | IError;
            } catch (error) {
                ToastAndroid.show('Неизвестная ошибка сервера...', ToastAndroid.SHORT);
                console.error('Error in POST_registrationEmail >>> ',error);
            }
        }

}


export default new HttpRegistrationService();