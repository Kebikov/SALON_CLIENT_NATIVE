import { baseLink } from "@/axios/axios.interceptors";
import axios from "axios";
import { IError } from "../../registration/types/registration.types";
import { IgetInfoBasic } from "../types/client.types";



class HttpClientService {

    /**
     * Получение информации о пользователе.
     * @param id в таблице registration
     */
    async GET_getClientInfo(id: number): Promise< IgetInfoBasic | IError | undefined > {
        try {
            const {data} = await axios.get(`${baseLink}/api/client/client-info/${id}`);
            return data as IgetInfoBasic | IError;
        } catch (error) {
            console.error('Error in GET_getClientInfo >>> ', error);
        }
    };
    /**
     * Проверка подтверждения почты пользователя.
     * @param id в таблице registration
     */
    async GET_isActiveEmail(id: number): Promise<boolean | undefined> {
        try {
            const {data} = await axios.get(`${baseLink}/api/client/check-is-active-email/${id}`);
            return data ? true : false;
        } catch (error) {
            console.error('Error in GET_isActiveEmail >>> ', error);
        }
    }

} 

export default new HttpClientService();