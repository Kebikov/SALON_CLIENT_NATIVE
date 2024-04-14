import { IStateCreateAccount } from '@/pages/AuthCreateAccount/AuthCreateAccount';
import { ToastAndroid} from 'react-native';
import { CheckForm } from '@/helpers/checkForm/checkForm';


export const checkDataForm = (data: IStateCreateAccount): boolean => {

    if(!CheckForm.checkName(data.name)) {
        ToastAndroid.show('Имя не может быть короче 3-х букв.', ToastAndroid.SHORT);
        return false;
    }

    if(!CheckForm.checkEmail(data.email)) {
        ToastAndroid.show('Проверьте введенный Email.', ToastAndroid.SHORT);
        return false;
    }

    if(!CheckForm.checkPhone(data.phone)) {
        ToastAndroid.show('Проверьте введенный номер телефона.', ToastAndroid.SHORT);
        return false;
    }

    if(!CheckForm.checkPassword(data.password)) {
        ToastAndroid.show('Пароль не короче 5-ти символов.', ToastAndroid.SHORT);
        return false;
    }

    return true
}