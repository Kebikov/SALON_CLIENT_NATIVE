import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHookCheckErrorResponce } from '@/hooks/useHookCheckErrorResponce';
import httpClientService from '@/api/routes/client/service/http.client.service';
import { useAppDispatch } from '@/redux/store/hooks';
import { setAppUserInfo } from '@/redux/slice/user.slice';
import { IResRegistration } from '@/api/routes/registration/types/registration.types';
import { useHookRouter } from '@/helpers/router/useHookRouter';

import type { TRole } from '@/api/routes/registration/types/registration.types';


/**
 * `Hook для получения базовой информации о пользователе.`
 * @example const { getStartDataUser } = useHookGetStartDataUser();
 * @return `await getStartDataUser()`
 */
export const useHookGetStartDataUser = () => {

    const {appRouter} = useHookRouter();
    const dispatch = useAppDispatch();
    const {modalMessageError} = useHookCheckErrorResponce();

    async function getStartDataUser() {
        const userJSON = await AsyncStorage.getItem('@user');
        if(!userJSON) return modalMessageError('Error','Данные небыли сохранены, пройдите авторизацию повторно.');
        const user = JSON.parse(userJSON) as IResRegistration;
        if('id' in user) {
            const result = await httpClientService.GET_getClientInfo(user.id);
            if(!result) {
                await AsyncStorage.clear();
                return appRouter.replace('/');
            }
            dispatch(setAppUserInfo(result));
            //if(!result.isActivated) return modalMessageError('Error', 'Пожалуйста проверьте свою почту и подтвердите ее переходом по ссылке в письме, проверьте папку спам !');
            if(result.role) return result.role;
        }
    };

    return {
        getStartDataUser
    }

}