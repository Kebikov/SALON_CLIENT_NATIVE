import { TypeRootPage } from '@/navigation/navigation.types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfo } from './getUserInfo';
import { AuthSessionResult } from 'expo-auth-session';




/**
 * Проверка/Установка User.
 * - Проверяет, есть ли уже пользователь, если есть перенаправляем на главную.
 * - Если нет, запускает getUserInfo.
 */
const handleSingInWithGoogle = async (response: AuthSessionResult | null) => {

    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>();

    const user = await AsyncStorage.getItem('@user');
    
    if(user) {
        navigate('Home');
    } else {
        if(response && response.type === "success" && response.authentication) {
            const result = await getUserInfo(response.authentication.accessToken);
            console.log(result);
            if(result) {
                navigate('Home');
            }
        }
    }
};

export default handleSingInWithGoogle;

