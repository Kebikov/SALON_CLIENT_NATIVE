import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfo } from './getUserInfo';
import { AuthSessionResult } from 'expo-auth-session';
import { registrationUserOnTheServer } from './registrationUserOnTheServer';
import { IUserGoogle } from './formatToInterfaceIUser';


/**
 * Проверка/Установка User.
 * - Проверяет, есть ли уже пользователь, если есть перенаправляем на главную.
 * - Если нет, запускает getUserInfo.
 */
const handleSingInWithGoogle = async (response: AuthSessionResult | null, navigate: Function) => {
    try{

        const user = await AsyncStorage.getItem('@user');
        
        if(user) {
            navigate('Home');
        } else {
            if(response && response.type === "success" && response.authentication) {
                const infoUser: IUserGoogle | null = await getUserInfo(response.authentication.accessToken);

                if(!infoUser) return;

                const resultRegistration = await registrationUserOnTheServer(infoUser);
                if(resultRegistration) {
                    navigate('Home');
                }
            }
        }
    } catch(error) {
        console.error(error);
    }
};

export default handleSingInWithGoogle;

