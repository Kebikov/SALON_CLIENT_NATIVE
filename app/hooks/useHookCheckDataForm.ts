import { IReqBodyRegistrationEmail } from '@/axios/routes/registration/types/registration.types';
import { CheckForm } from '@/helpers/checkForm/checkForm';
import { useAppDispatch } from '@/redux/store/hooks';
import { setAppModalObject } from '@/redux/slice/modal.slice';


/**
 * Проверка полей формы регистрации.
 * @returns {checkDataForm}
 */
export const useHookCheckDataForm = () => {

    const dispatch = useAppDispatch();

    const checkDataForm = (data: IReqBodyRegistrationEmail): boolean => {
        //* Проверка имени.
        if(!CheckForm.checkName(data.name)) {
            dispatch(setAppModalObject({
                message: 'Имя не может быть короче 3-х букв.',
                modalType: 'error',
                modalVisible: true
            }));
            return true;
        }
        //* Проверка Email.
        if(!CheckForm.checkEmail(data.email)) {
    
            dispatch(setAppModalObject({
                message: 'Проверьте введенный Email.',
                modalType: 'error',
                modalVisible: true
            }));
    
            return true;
        }
        //* Проверка телефона.
        if(!CheckForm.checkPhone(data.phone)) {
    
            dispatch(setAppModalObject({
                message: 'Проверьте введенный номер телефона.',
                modalType: 'error',
                modalVisible: true
            }));
    
            return true;
        }
        //* Проверка пароля.
        if(!CheckForm.checkPassword(data.password)) {
    
            dispatch(setAppModalObject({
                message: 'Пароль не короче 5-ти символов.',
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