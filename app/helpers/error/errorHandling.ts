import { IError } from "@/api/routes/registration/types/registration.types";
import { TGIError } from "../type-guards/TGIError";


/**
 * `Обработака поступившей ошибки.`
 */
export const errorHandling = (error: unknown): IError | undefined  => {
    if(error && typeof error === 'object' && 'response' in error) {
        const response = error.response;
        if(response && typeof response === 'object' && 'data' in response) {
            const data = response.data;
            console.log('Data Error = ', data);
            if(TGIError(data)) {
                return data;
            }
            // Data Error =  {"error": "Доступ не подтвержден..."}
        }
    } else {
        console.error('Error in POST_changePassword >>> ', error);
    }
}