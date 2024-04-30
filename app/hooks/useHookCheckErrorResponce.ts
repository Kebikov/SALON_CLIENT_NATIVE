import type { IError } from "@/axios/routes/registration/types/registration.types";
import { useAppDispatch } from '@/redux/store/hooks';
import { setAppModalObject } from '@/redux/slice/modal.slice';
import { IMessage } from "@/axios/routes/authentication/types/authentication.types";


/**
 * `Hook для работы с модальным окном.`
 * - `modalMessageError` - Вывод ошибки в модальное окно.
 * - `isIError` - Проверка на тип IError и вывод в модальное окно входяшиго сообшения.
 */
export const useHookCheckErrorResponce = () => {

    const dispatch = useAppDispatch();

    /**
     * `Проверка является ли обьектом IError.`
     * - Вывод в модальное окно сообщения.
     * @example if( isIError(data) ) return;
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
     * @example if( isUndefined(data) ) return;
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
     * `Проверка является ли обьектом IMessage.`
     * - Вывод в модальное окно сообщения.
     * @example if( isMessage(data) ) return;
     * @returns
     * - true = если IMessage
     * - false = не  IMessage
     */
        const isMessage = (data: unknown): data is IMessage => {
            if(data && typeof data === 'object' && "msg" in data && typeof data.msg === 'string') {
                dispatch(setAppModalObject({
                    message: data.msg,
                    modalType: 'message',
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
        isMessage,
        modalMessageError,
        dispatch,
        setAppModalObject
    }

}