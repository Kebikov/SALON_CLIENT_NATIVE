import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHookCheckErrorResponce } from '@/hooks/useHookCheckErrorResponce';
import httpClientService from '@/api/routes/client/service/http.client.service';
import React from 'react';
import type { IgetInfoBasic } from '@/api/routes/client/types/client.types';


/**
 * Hook для получения базовой информации о пользователе.
 * @param setUserInfo Function useState() для установки информации о пользователе в компоненте.
 */
export const useHookGetStartDataUser = () => {

    const {isIError, isUndefined, modalMessageError} = useHookCheckErrorResponce();

    async function getStartDataUser(setUserInfo: React.Dispatch<React.SetStateAction<IgetInfoBasic | null>>) {
        const userJSON = await AsyncStorage.getItem('@user');
        if(!userJSON) return modalMessageError('Данные небыли сохранены, пройдите авторизацию повторно.');
        const user = JSON.parse(userJSON);
        if('id' in user) {
            const result = await httpClientService.GET_getClientInfo(user.id);
            if(isUndefined(result)) return;
            if(isIError(result)) return;
            setUserInfo(result);
            const isActive = await httpClientService.GET_isActiveEmail(user.id);
            if(!isActive) return modalMessageError('Пожалуйста проверьте свою почту и подтвердите ее переходом по ссылке в письме, проверьте папку спам !');
        }
    };

    return {
        getStartDataUser
    }

}