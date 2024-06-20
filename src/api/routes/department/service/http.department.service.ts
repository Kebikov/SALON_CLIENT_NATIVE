import { axiosInstance, axiosInstanceWithAuth } from "@/api/axios/axios.instance/instance";
import type { IDataDepartment, IDataDepartmentAndId } from "../types/department.dto";
import type { IMessage } from "../../authentication/types/authentication.types";


class HttpDepartmentService {

    /**
     * `Добавление нового департамента(группы).`
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
            console.error('Error in POST_createDepartment >>> ', error);
        }
    };

    /**
     * `Получение всех групп.`
     */
    async GET_getDepartments(): Promise<IDataDepartmentAndId[] | null | undefined> {
        try {
            const {data} = await axiosInstanceWithAuth.get('/department/get-departments');
            if(data === null) return null;
            return data as IDataDepartmentAndId[];
        } catch (error) {
            console.error('Error in GET_getDepartments >>> ', error);
        }
    }

    /**
     * `Получение группы по ее id.`
     * @param id ID Группы.
     */
    async GET_getDepartmentById(id: number): Promise<IDataDepartmentAndId | null | undefined> {
        try {
            const {data} = await axiosInstanceWithAuth.get(`/department/get-department/${id}`);
            if(data === null) return null;
            return data as IDataDepartmentAndId;
        } catch (error) {
            console.error('Error in getDepartmentById >>> ', error);
        }
    }

    /**
     * `Редактирование группы.`
     * @param payload Данные группы.
     */
    async PATCH_patchDepartment(payload: IDataDepartmentAndId) {
        try {
            const {data} = await axiosInstanceWithAuth.patch(`/department/patch-department`, payload);

            return data as IMessage;
        } catch (error) {
            console.error('Error in PATCH_patchDepartment >>> ', error);
        }
    }

    /**
     * `Удаление группы.`
     * @param id Id удаляемой группы.
     */
    async DELETE_deleteDepartment(id: number) {
        try {
            const {data} = await axiosInstanceWithAuth.delete(`/department/delete-department/${id}`);

            return data as IMessage;
        } catch (error) {
            console.error('Error in DELETE_deleteDepartment >>> ', error);
        }
    }
}

export default new HttpDepartmentService();


