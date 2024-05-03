import { axiosInstance } from "@/api/axios/axios.instance/instance";
import { IReqBodyRegistrationEmail, IResRegistration, IReqBodyRegistrationGoogle } from '@/api/routes/registration/types/registration.types';
import { IError } from "@/api/routes/registration/types/registration.types";


class HttpRegistrationService {

    /**
     * Авторизация через Email.
     * @example const result = await httpRegistrationService.POST_registrationEmail(body: IReqBodyRegistrationEmail);
     */
    async POST_registrationEmail(body: IReqBodyRegistrationEmail): Promise<IResRegistration | undefined> {
        try {
            const {data} = await axiosInstance.post(`/registration/email`, body);
            return data as IResRegistration;
        } catch (error) {
            console.error('Error in POST_registrationEmail >>> ',error);
        }
    }

    /**
     * Авторизация через Google.
     * @example const result = await POST_registrationGoogle(body: IReqBodyRegistrationGoogle);
     */
    async POST_registrationGoogle(body: IReqBodyRegistrationGoogle): Promise<IResRegistration | undefined> {
        try {
            const {data} = await axiosInstance.post(`/registration/google`, body);
            return data as IResRegistration;
        } catch (error) {
            console.error('Error in POST_registrationEmail >>> ',error);
        }
    }

    /**
     * `Обновление токенов.`
     */
    async POST_updateToken(id: number, refreshToken: string): Promise<IResRegistration | undefined> {
        try {
            const {data} = await axiosInstance.post(`/registration/updateToken`, {id, refreshToken});
            return data as IResRegistration;
        } catch (error) {
            console.error(error);
        }
    }

}


export default new HttpRegistrationService();