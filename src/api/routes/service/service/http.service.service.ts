import { IMessage } from "../../authentication/types/authentication.types";
import { axiosInstanceWithAuth } from "@/api/axios/axios.instance/instance";
import { axiosInstance } from "@/api/axios/axios.instance/instance";
import type { ServiceDTOAndDepartmentName } from "../types/service.types";
import { baseLink } from "@/api/axios/axios.instance/instance";


class HttpClientService {

    /**
     * `//: Добавление новой услуги.`
     * @param formData [ type IService ]
     */
    async POST_createService(formData: FormData) {
        try {

            const config = { method: "POST", headers: {"Content-Type": "multipart/form-data" } };
            const {data} = await axiosInstanceWithAuth.post(`/service/create-service`, formData, config);

            return data as IMessage;
        } catch (error) {
            console.error(`Error in POST_createService >>> `, error);
        }
    };

    /**
     * `//: Редактирование услуги.`
     */
    async PATCH_editService(formData: FormData) {
        try {
            const config = { method: "PATCH", headers: {"Content-Type": "multipart/form-data" } };
            const {data} = await axiosInstanceWithAuth.patch(`/service/edit-service`, formData, config);
            
            return data as IMessage;
        } catch (error) {
            console.error(`Error in PATCH_editService >>> `, error);
        }
    };
    
    /**
     * `//: Получение всех услуг.`
     */
    async GET_getAllServices() {
        try{
            const {data} = await axiosInstance.get('/service/get-all-services');
            return data as ServiceDTOAndDepartmentName[];
        }catch(error) {
            console.error(`Error in GET_getAllServices >>> `, error);
        }
    }

    /**
     * `//: Удаление сервиса.`
     * @param id ID Сервиса.
     * @param title Название сервиса.
     */
    async DELETE_deleteServiceById(id: number, title: string): Promise<IMessage | undefined> {
        try{
            const {data} = await axiosInstanceWithAuth.delete(`/service/delete-service/${id}?title=${title}`);
            return data as IMessage;
        }catch(error) {
            console.error(`Error in DELETE_deleteServiceById >>> `, error);
        }
    }
} 

export default new HttpClientService();