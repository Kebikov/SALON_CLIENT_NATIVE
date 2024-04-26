import { baseLink } from "@/axios/axios.interceptors";
import axios from "axios";
import type { IAuthenticationData, IBaseForAuth } from "../types/authentication.types";
import type { IResRegistration, IError } from "../../registration/types/registration.types";


const path = baseLink + '/api/authentication';


class HttpAuthenticationService {
    /**
     * `Авторизация пользователя через почта + пароль.`
     * @param body type IAuthenticationData.
     * @returns Promise< IResRegistration | IError | undefined >
     */
    async POST_authentication(body: IAuthenticationData): Promise< IResRegistration | IError | undefined > {
        try {
            const {data} = await axios.post(path, body);
            return data as IResRegistration | IError;
        } catch (error) {
            console.log(error);
        }
    }

}

export default new HttpAuthenticationService();