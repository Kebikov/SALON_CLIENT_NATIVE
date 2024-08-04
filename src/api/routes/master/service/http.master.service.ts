import { axiosInstance, axiosInstanceWithAuth } from "@/api/axios/axios.instance/instance";
import { checkNetwork } from "@/api/axios/check/checkNetwork";

import type { IMasterFind, IAddMaster } from "@/api/routes/master/types/master.dto";
import type { IMessage } from "../../authentication/types/authentication.types";
import type { IGetServiceOfMaster } from "@/api/routes/master/types/master.dto";


class HttpMasterService {

    /**
     * `Получение всех записей в таблице "Master".`
     */
    async GET_getMasterAll(): Promise<IMasterFind[] | null | undefined> {
        try {
            const {data} = await axiosInstanceWithAuth.get(`/master/master-all`);  

            return data ? data as IMasterFind[] : data as null;
        } catch (error) {
            console.error('Error in [GET_getMasterAll] >>> ', error);
        }
    };

    /**
     * `Add Master.`
     */
    async POST_addMaster(formData: FormData) {
        try {
            const config = { method: "POST", headers: {"Content-Type": "multipart/form-data" } };
            const {data} = await axiosInstanceWithAuth.post(`/master/add-master`, formData, config);

            return data as IMessage;
        } catch (error) {
            console.error('Error in [POST_addMaster] >>> ', error);
        }
    }

    /**
     * `Edit Master.`
     */
    async PATCH_editMaster(formData: FormData) {
        try {
            await checkNetwork();
            const config = { method: "PATCH", headers: {"Content-Type": "multipart/form-data" } };
            const {data} = await axiosInstanceWithAuth.patch(`/master/edit-master`, formData, config);

            return data as IMessage;
        } catch (error) {
            console.error('Error in [PATCH_editMaster] >>> ', error);
        }
    }

    /**
     * `Delete Master.`
     */
    async DELETE_deleteMaster(id: number) {
        try {
            const {data} = await axiosInstanceWithAuth.delete(`/master/delete-master/${id}`);

            return data as IMessage;
        } catch (error) {
            console.error('Error in [DELETE_deleteMaster] >>> ', error);
        }
    }

    /**
     * `Получение услуг мастера.`
     */
    async GET_getServicesOfMaster(id: number): Promise<IGetServiceOfMaster[] | null | undefined> {
        try {
            const {data} = await axiosInstanceWithAuth.get(`/master/get-service-of-master/${id}`);

            return data as IGetServiceOfMaster[] | null;
        } catch (error) {
            console.error('Error in [GET_getServicesOfMaster] >>> ', error);
        }
    }

    /**
     * `Получение услуг мастера.`
     */
        async POST_masterAndService(action: 'push' | 'remove',  id_master: number, id_service: number): Promise<IMessage | undefined> {
            try {
                const {data} = await axiosInstanceWithAuth.post(`/master/master-and-service`, {action, id_master, id_service});
    
                return data as IMessage;
            } catch (error) {
                console.error('Error in [POST_masterAndService] >>> ', error);
            }
        }

}

export default new HttpMasterService();


