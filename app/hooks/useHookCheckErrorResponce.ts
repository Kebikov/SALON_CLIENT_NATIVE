import type { IError } from "@/axios/routes/registration/types/registration.types";
import { useAppDispatch } from '@/redux/store/hooks';
import { setAppModalObject } from '@/redux/slice/modal.slice';
import { checkErrorResponce } from '@/axios/helpers/checkErrorResponce';


/**
 * Проверка ответа сервера на IError | undefined.
 * - В случае если IError | undefined, будет выведено модальное окно с сообщением.
 * @returns 
 */
export const useHookCheckErrorResponce = () => {

    const dispatch = useAppDispatch();

    
    /**
     * Проверка является ли обьектом ошибки.
     * - Вывод в модальное окно сообщения.
     * @example checkResponce(data: unknown);
     * @returns
     * - true = если IError
     * - false = не IError
     */
    const checkResponce = (data: unknown): data is IError => {
        if(checkErrorResponce(data)) {
            if(!data) {
                dispatch(setAppModalObject({
                    message: 'Неизвестная ошибка сервера, попробуйте позже...',
                    modalType: 'error',
                    modalVisible: true
                }))
                return false;
            }
            if('error' in data) {
                dispatch(setAppModalObject({
                    message: data.error,
                    modalType: 'error',
                    modalVisible: true
                }))
                return true;
            }
        }
        return false;
    };

    return {
        checkResponce
    }

}