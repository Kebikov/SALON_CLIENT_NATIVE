import { IService } from "../types/service.types"; 
import { IMessage } from "../../authentication/types/authentication.types";
import { axiosInstanceWithAuth } from "@/api/axios/axios.instance/instance";



class HttpClientService {

    /**
     * `Добавление новой услуги.`
     * @param item [ type IService ]
     */
    async POST_createService(item: FormData): Promise<IMessage | undefined> {
        try {
            const config = {
                method: "post",
                data: item,
                headers: { "Content-Type": "multipart/form-data" },
            }
            const {data} = await axiosInstanceWithAuth.post(`/service/create-service`, item, config);
            return data as IMessage;
        } catch (error) {
            console.error(`Error in POST_createService >>> `, error);
        }
    };
    


} 

export default new HttpClientService();