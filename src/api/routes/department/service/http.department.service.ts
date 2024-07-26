import { axiosInstance, axiosInstanceWithAuth } from "@/api/axios/axios.instance/instance";
import type { DepartmentDTO } from "@/api/routes/department/types/department.types";
import type { IMessage } from "../../authentication/types/authentication.types";


class HttpDepartmentService {

    /**
     * `Добавление нового департамента(группы).`
     * @param payload type DepartmentDTO
     * @example 
     * await httpDepartmentService.POST_createDepartment({
     *    name: '#', 
     *    discription: '#', 
     *    icon: '#'
     * });
     */
    async POST_createDepartment(payload: Omit<DepartmentDTO, 'id'>): Promise<IMessage | undefined> {
        try {
            const {data} = await axiosInstanceWithAuth.post(`/department/create-department`, payload);  
            return data as IMessage;
        } catch (error) {
            console.error('Error in [POST_createDepartment] >>> ', error);
        }
    };

    /**
     * `Получение всех групп.`
     */
    async GET_getDepartments(): Promise<DepartmentDTO[] | null | undefined> {
        try {
            const {data} = await axiosInstanceWithAuth.get('/department/get-departments');
            if(data === null) return null;
            return data as DepartmentDTO[];
        } catch (error) {
            console.error('Error in [GET_getDepartments] >>> ', error);
        }
    }

    /**
     * `Получение группы по ее id.`
     * @param id ID Группы.
     */
    async GET_getDepartmentById(id: number): Promise<DepartmentDTO | null | undefined> {
        try {
            const {data} = await axiosInstanceWithAuth.get(`/department/get-department/${id}`);
            if(data === null) return null;
            return data as DepartmentDTO;
        } catch (error) {
            console.error('Error in [getDepartmentById] >>> ', error);
        }
    }

    /**
     * `Редактирование группы.`
     * @param payload Данные группы.
     */
    async PATCH_patchDepartment(payload: DepartmentDTO) {
        try {
            const {data} = await axiosInstanceWithAuth.patch(`/department/patch-department`, payload);

            return data as IMessage;
        } catch (error) {
            console.error('Error in [PATCH_patchDepartment] >>> ', error);
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
            console.error('Error in [DELETE_deleteDepartment] >>> ', error);
        }
    }
}

export default new HttpDepartmentService();


