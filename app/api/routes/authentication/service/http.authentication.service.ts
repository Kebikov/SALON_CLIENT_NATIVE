import { baseLink } from "@/api/axios.interceptors";
import axios from "axios";
import type { IAuthenticationData, IMessage } from "../types/authentication.types";
import type { IResRegistration, IError } from "../../registration/types/registration.types";
import { authAxios } from "@/api/axios.interceptors";
import { errorHandling } from "@/helpers/error/errorHandling";


const path = baseLink + '/api/authentication';


class HttpAuthenticationService {

    /**
     * `Авторизация пользователя через почта + пароль.`
     * @param body type IAuthenticationData.
     * @returns Promise< IResRegistration | IError | undefined >
     */
    async POST_authentication(body: IAuthenticationData): Promise<IResRegistration | IError | undefined> {
        try {
            const {data} = await axios.post(path, body);
            return data as IResRegistration | IError;
        } catch (error) {
            return errorHandling(error);
        }
    }
    
    /**
     * `Востановление пароля, через почту.`
     */
    async POST_authForgot(email: string): Promise<IMessage | IError | undefined> {
        try {
            const {data} = await axios.post(`${path}/auth-forgot`, {email});
            return data as IMessage | IError;
        } catch (error) {
            return errorHandling(error);
        }
    }

    /**
     * `Изминение пароля пользователя.`
     */
    async POST_changePassword(password: string): Promise<IError | IMessage | undefined> {
        try {
            const {data} = await authAxios.post(`${path}/change-password`, {password});
            return data as IMessage | IError;
        } catch (error) {
            return errorHandling(error);
        }
    }

}

export default new HttpAuthenticationService();