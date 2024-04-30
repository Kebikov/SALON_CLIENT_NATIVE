import AsyncStorage from '@react-native-async-storage/async-storage';
import type { IResRegistration } from '@/axios/routes/registration/types/registration.types';


/**
 * `Сохранение данных пользователя в AsyncStorage.`
 * @param data type IResRegistration
 */
export const asyncStorageSaveUser = async (data: IResRegistration) => {
    // Расчет конечного времени жизни аксес токена.
    /**
     * Переданное время переводим в милисекунды, перемножая data.expiresIn значение в котором в секундах на 1000, чтобы получить милисекунды в итоге.
     */
    const timeInMs = data.expiresIn *  1000;
    data.expiresIn = timeInMs + new Date().getTime();
    await AsyncStorage.setItem('@user', JSON.stringify(data));
}