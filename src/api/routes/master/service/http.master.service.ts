import { axiosInstance, axiosInstanceWithAuth } from "@/api/axios/axios.instance/instance";

import { IMasterFind } from "../types/master.dto";
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

}

export default new HttpMasterService();


