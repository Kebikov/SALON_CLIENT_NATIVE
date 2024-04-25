import { baseLink } from "@/axios/axios.interceptors";
import { ToastAndroid } from "react-native";
import axios from "axios";
import { IError } from "../../registration/types/registration.types";
import { IgetInfoBasic } from "../types/client.types";



class HttpClientService {

    /**
     * Получение информации о пользователе.
     */
    async GET_getClientInfo(id: number): Promise< IgetInfoBasic | IError | undefined > {
        try {
            const {data} = await axios.get(`${baseLink}/api/client/client-info/${id}`);
            return data as IgetInfoBasic | IError;
        } catch (error) {
            console.log('Error in GET_getClientInfo >>> ', error);
        }
    };


} 

export default new HttpClientService();