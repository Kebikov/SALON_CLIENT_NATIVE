import type { IAuthenticationData, IMessage } from "../types/authentication.types";
import type { IResRegistration } from "../../registration/types/registration.types";
import { axiosInstance, axiosInstanceWithAuth } from "@/api/axios/axios.instance/instance"; 


class HttpAuthenticationService {

    /**
     * `Авторизация пользователя через почта + пароль.`
     * @param body type IAuthenticationData.
     * @returns Promise< IResRegistration | undefined >
     */
    async POST_authentication(body: IAuthenticationData): Promise<IResRegistration | undefined> {
        try {
            const {data} = await axiosInstance.post('/authentication', body);
            return data as IResRegistration;
        } catch (error) {
            console.error('Error in POST_authentication >>> ',error);
        }
    }
    
    /**
     * `Востановление пароля, через почту.`
     */
    async POST_authForgot(email: string): Promise<IMessage | undefined> {
        try {
            const {data} = await axiosInstance.post(`/authentication/auth-forgot`, {email});
            return data as IMessage;
        } catch (error) {
            console.error('Error in POST_authForgot >>> ',error);
        }
    }

    /**
     * `Изминение пароля пользователя.`
     */
    async POST_changePassword(password: string): Promise<IMessage | undefined> {
        try {
            const {data} = await axiosInstanceWithAuth.post(`/authentication/change-password`, {password});
            return data as IMessage;
        } catch (error) {
            console.error('Error in POST_changePassword >>> ',error);
        }
    }

}

export default new HttpAuthenticationService();