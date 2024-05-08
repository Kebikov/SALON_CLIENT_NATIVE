import type { IError } from "@/api/routes/registration/types/registration.types";
import { useAppDispatch } from '@/redux/store/hooks';
import { setAppModalObject } from '@/redux/slice/modal.slice';
import { IMessage } from "@/api/routes/authentication/types/authentication.types";
import { TGIError } from "@/helpers/type-guards/TGIError";


/**
 * `Hook для работы с модальным окном.`
 * - `modalMessageError` - Вывод ошибки в модальное окно.
 * - `isIError` - Проверка на тип IError и вывод в модальное окно входяшиго сообшения.
 * - `isUndefined` - Проверка является ли обьектом undefined. Вывод в модальное окно сообщения.
 * - `isMessage` - Проверка является ли обьектом IMessage. Вывод в модальное окно сообщения.
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
        if(TGIError(data)) {
            dispatch(setAppModalObject({
                message: data.error,
                discription: data.discription,
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
     * - true = если undefined
     * - false = не undefined
     */
    const isUndefined = (data: unknown): data is undefined => {
        if(data === undefined) {
            dispatch(setAppModalObject({
                message: 'Error 500',
                discription: 'Неизвестная ошибка сервера, попробуйте позже. [isUndefined]',
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
            if(data && typeof data === 'object' && "msg" in data && typeof data.msg === 'string' && "discription" in data && typeof data.discription === 'string') {
                dispatch(setAppModalObject({
                    message: data.msg,
                    discription: data.discription,
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
    const modalMessageError = (title: string, discription: string) => {
        dispatch(setAppModalObject({
            message: title,
            discription: discription,
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