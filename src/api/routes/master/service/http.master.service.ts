import { axiosInstance, axiosInstanceWithAuth } from "@/api/axios/axios.instance/instance";
import axios from "axios";
import { baseLink } from "@/api/axios/axios.instance/instance";

import { IMasterFind, IAddMaster } from "@/api/routes/master/types/master.dto";
import type { IMessage } from "../../authentication/types/authentication.types";


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
            const config = { method: "POST", headers: {"Content-Type": "multipart/form-data" } };
            const {data} = await axiosInstanceWithAuth.post(`/master/edit-master`, formData, config);

            return data as IMessage;
        } catch (error) {
            console.error('Error in [PATCH_editMaster] >>> ', error);
        }
    }

}

export default new HttpMasterService();


