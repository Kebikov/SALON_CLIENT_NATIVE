import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfo } from './getUserInfo';
import { AuthSessionResult } from 'expo-auth-session';
import { registrationUserOnTheServer } from './registrationUserOnTheServer';
import { IUserGoogle } from './formatToInterfaceIUser';
import { IAppRouter } from '@/helpers/router/useHookRouter';


/**
 * Проверка/Установка User.
 * - Проверяет, есть ли уже пользователь, если есть перенаправляем на главную.
 * - Если нет, запускает getUserInfo.
 */
const handleSingInWithGoogle = async (response: AuthSessionResult | null): Promise<boolean | undefined> => {
    try{

        const user = await AsyncStorage.getItem('@user');

        if(user) {
            return true;
        } else {
            if(response && response.type === "success" && response.authentication) {
                const infoUser: IUserGoogle | null = await getUserInfo(response.authentication.accessToken);
                if(!infoUser) return false;
                const resultRegistration = await registrationUserOnTheServer(infoUser);
                if(resultRegistration) return true;
            } else {
                return false;
            }
        }
    } catch(error) {
        console.error(error);
    }
};

export default handleSingInWithGoogle;

