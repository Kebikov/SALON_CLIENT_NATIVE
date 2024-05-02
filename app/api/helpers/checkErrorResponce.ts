
import { IError } from "@/api/routes/registration/types/registration.types";


/**
 * Проверка ответа сервера на ошибки.
 * @example checkErrorResponce(data: unknown);
 * @returns true (есть ошибки) || false (нет ошибок)
 */
export const checkErrorResponce = (data: unknown): data is IError | undefined => {

    if(!data) {
        return true;
    }

    if(typeof data === 'object' && "error" in data && typeof data.error === 'string') {
        return true;
    }

    return false;
}