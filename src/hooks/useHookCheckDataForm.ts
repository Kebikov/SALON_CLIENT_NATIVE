import { IReqBodyRegistrationEmail } from '@/api/routes/registration/types/registration.types';
import { CheckForm } from '@/helpers/check/checkForm';
import { useAppDispatch } from '@/redux/store/hooks';
import { setAppModalObject } from '@/redux/slice/modal.slice';


/**
 * Проверка полей формы регистрации.
 * @returns 
 * `checkDataForm` - Function проверки полей формы.
 */
export const useHookCheckDataForm = () => {

    const dispatch = useAppDispatch();
    /**
     * `Проверка полей формы.`
     * @returns 
     * - true = есть ошибки.
     * - false = нет ошибок.
     */
    const checkDataForm = (data: Partial<IReqBodyRegistrationEmail>): boolean => {
        //* Проверка имени.
        if(data.name !== undefined && !CheckForm.checkName(data.name)) {
            dispatch(setAppModalObject({
                message: 'Проверьте имя',
                discription: 'Имя не может быть короче 3-х букв.',
                modalType: 'error',
                modalVisible: true
            }));
            return true;
        }
        //* Проверка Email.
        if(data.email !== undefined && !CheckForm.checkEmail(data.email)) {
            dispatch(setAppModalObject({
                message: 'Проверьте Email',
                discription: 'Проверьте введенный Email на наличие ошибок.',
                modalType: 'error',
                modalVisible: true
            }));
            return true;
        }
        //* Проверка телефона.
        if(data.phone !== undefined && !CheckForm.checkPhone(data.phone)) {
            dispatch(setAppModalObject({
                message: 'Проверьте телефон',
                discription: 'Проверьте введенный номер телефона на наличие ошибок.',
                modalType: 'error',
                modalVisible: true
            }));
            return true;
        }
        //* Проверка пароля.
        if(data.password !== undefined && !CheckForm.checkPassword(data.password)) {
            dispatch(setAppModalObject({
                message: 'Проверьте пароль',
                discription: 'Пароль должен быть не короче 5-ти символов.',
                modalType: 'error',
                modalVisible: true
            }));
            return true;
        }
        return false;
    }

    return {
        checkDataForm
    }

}