import type { IError } from "@/axios/routes/registration/types/registration.types";
import { useAppDispatch } from '@/redux/store/hooks';
import { setAppModalObject } from '@/redux/slice/modal.slice';


/**
 * `Hook для проверки и вывода результата в модальное окно на IError | undefined.`
 */
export const useHookCheckErrorResponce = () => {

    const dispatch = useAppDispatch();

    /**
     * `Проверка является ли обьектом ошибки.`
     * - Вывод в модальное окно сообщения.
     * @example if(isIError) return;
     * @returns
     * - true = если IError
     * - false = не IError
     */
    const isIError = (data: unknown): data is IError => {
        if(data && typeof data === 'object' && "error" in data && typeof data.error === 'string') {
            dispatch(setAppModalObject({
                message: data.error,
                modalType: 'error',
                modalVisible: true
            }))
            return true;
        } else {
            return false;
        }
    };
    /**
     * `Проверка является ли обьектом undefined.`
     * - Вывод в модальное окно сообщения.
     * @example if(isUndefined) return;
     * @returns
     * - true = если IError
     * - false = не IError
     */
    const isUndefined = (data: unknown): data is undefined => {
        if(data === undefined) {
            dispatch(setAppModalObject({
                message: 'Неизвестная ошибка сервера, попробуйте позже...',
                modalType: 'error',
                modalVisible: true
            }))
            return true;
        } else {
            return false;
        }
    }
    /**
     * `Вывод в модальное окно текста ошибки.`
     */
    const modalMessageError = (message: string) => {
        dispatch(setAppModalObject({
            message: message,
            modalType: 'error',
            modalVisible: true
        }));
    }

    return {
        isIError,
        isUndefined,
        modalMessageError,
        dispatch,
        setAppModalObject
    }

}