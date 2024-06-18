import { IService } from "../types/service.types"; 
import { IMessage } from "../../authentication/types/authentication.types";
import { axiosInstanceWithAuth } from "@/api/axios/axios.instance/instance";



class HttpClientService {

    /**
     * `Добавление новой услуги.`
     * @param item [ type IService ]
     */
    async POST_createService(item: IService): Promise<IMessage | undefined> {
        try {
            const {data} = await axiosInstanceWithAuth.post(`/service/create-service`, item);
            return data as IMessage;
        } catch (error) {
            console.error('Error in GET_getClientInfo >>> ', error);
        }
    };
    


} 

export default new HttpClientService();