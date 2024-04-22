import { ToastAndroid } from "react-native";
import { IError } from "../routes/registration/types/registration.types";


/**
 * Проверка ответа сервера на ошибки.
 * @example checkErrorResponce(data: unknown);
 * @returns true(есть ошибки), false(нет ошибок);
 */
export const checkErrorResponce = (data: unknown): data is IError | undefined => {

    if(!data) {
        ToastAndroid.show('Неизвестная ошибка сервера...', ToastAndroid.SHORT);
        return true;
    }

    if(typeof data === 'object' && "error" in data && typeof data.error === 'string') {
        ToastAndroid.show(data.error, ToastAndroid.SHORT);
        return true;
    }

    return false;
}