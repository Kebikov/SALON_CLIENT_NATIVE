import { IError } from "../../registration/types/registration.types";
import { IgetInfoBasic } from "../types/client.types";
import { axiosInstance, axiosInstanceWithAuth } from "@/api/axios/axios.instance/instance";



class HttpClientService {

    /**
     * Получение информации о пользователе.
     * @param id в таблице registration
     */
    async GET_getClientInfo(id: number): Promise<IgetInfoBasic | undefined> {
        try {
            const {data} = await axiosInstanceWithAuth.get(`/client/client-info/${id}`);
            return data as IgetInfoBasic;
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
            const {data} = await axiosInstanceWithAuth.get(`/client/check-is-active-email/${id}`);
            return data ? true : false;
        } catch (error) {
            console.error('Error in GET_isActiveEmail >>> ', error);
        }
    }

} 

export default new HttpClientService();