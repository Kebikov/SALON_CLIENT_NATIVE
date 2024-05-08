import { axiosInstance, axiosInstanceWithAuth } from "@/api/axios/axios.instance/instance";
import type { IDataDepartment } from "../types/department.dto";
import type { IMessage } from "../../authentication/types/authentication.types";


class HttpDepartmentService {

    /**
     * Добавление нового департамента(группы).
     * @param payload type IDataDepartment
     * @example 
     * await httpDepartmentService.POST_createDepartment({
     *    name: '#', 
     *    discription: '#', 
     *    icon: '#'
     * });
     */
        async POST_createDepartment(payload: IDataDepartment): Promise<IMessage | undefined> {
            try {
                const {data} = await axiosInstanceWithAuth.post(`/department/create-department`, payload);
                return data as IMessage;
            } catch (error) {
                console.error('Error in GET_getClientInfo >>> ', error);
            }
        };

}

export default new HttpDepartmentService();