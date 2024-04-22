import { baseLink } from "@/axios/paths";
import axios from "axios";
import { IReqBodyRegistrationEmail, IResRegistration } from '@/axios/routes/registration/types/registration.types';
import { ToastAndroid } from "react-native";
import { IError } from "@/axios/routes/registration/types/registration.types";


class HttpRegistrationService {

    /**
     * Авторизация через Email.
     */
    async POST_registrationEmail(body: IReqBodyRegistrationEmail): Promise<IResRegistration | IError | undefined> {
        try {
            const {data} = await axios.post(`${baseLink}/api/registration/email`, body);
            return data as IResRegistration | IError;
        } catch (error) {
            ToastAndroid.show('Неизвестная ошибка сервера...', ToastAndroid.SHORT);
            console.log('Error in POST_registrationEmail >>> ',error);
        }
    }
}


export default new HttpRegistrationService();