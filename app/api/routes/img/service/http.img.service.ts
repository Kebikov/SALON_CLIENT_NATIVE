import { axiosInstance, axiosInstanceWithAuth } from "@/api/axios/axios.instance/instance";
import type { TFolder } from "../types/img.types";


class HttpImgService {

    /**
     * `Получение всех изображений в папке.`
     */
    async GET_files(folder: TFolder) {
        try {
            const {data} = await axiosInstanceWithAuth.get(`/img/get-files/${folder}`);
            return data as string[];
        } catch (error) {
            console.error('Error in GET_img >>> ', error);
        }
    }
};

export default new HttpImgService();