import { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios';
import React, { FC, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IResRegistration } from '@/api/routes/registration/types/registration.types'; 
import { asyncStorageSaveUser } from '@/helpers/save/saveUserInAsyncStorage';
import { TGIResRegistration } from '@/helpers/type-guards/TGIResRegistration';
import { axiosInstance, axiosInstanceWithAuth } from '@/api/axios/axios.instance/instance';
import httpRegistrationService from '@/api/routes/registration/service/registration.service';
import { useHookCheckErrorResponce } from '@/hooks/useHookCheckErrorResponce';


interface IApiInterceptors {
    children: JSX.Element | JSX.Element[];
}

/**
 * @wrapper Оболочка для перехвата запросов к серверу.
 * @example 
 * @returns {JSX.Element}
 */
const ApiInterceptors: FC<IApiInterceptors> = ({children}) => {
    
    const {isIError, modalMessageError} = useHookCheckErrorResponce();

    useEffect(() => {

        //* Перехват запроса с регистрацией.
        const interceptorRequestWithAuth = axiosInstanceWithAuth.interceptors.request.use(
            async (req) => {
                const userJson = await AsyncStorage.getItem('@user');
                if(!userJson) return req;
                const {id, accessToken, refreshToken, expiresIn}: IResRegistration = JSON.parse(userJson);
                //* Токен живой.
                if(new Date().getTime() < expiresIn && accessToken && id) {
                    req.headers = {...req.headers, 'Authorization': `Bearer ${accessToken} ${id}`} as AxiosRequestHeaders;
                    return req;
                }
                //* Токен просрочен.
                if(expiresIn && id && new Date().getTime() > expiresIn) {
                    const data = await httpRegistrationService.POST_updateToken(id, refreshToken);
                    if(TGIResRegistration(data)) {
                        await asyncStorageSaveUser(data);
                        req.headers = {...req.headers, 'Authorization': `Bearer ${data.accessToken} ${id}`} as AxiosRequestHeaders;
                        return req;
                    }
                } 
                return req;
            }, 
            (error) => {
                return Promise.reject(error);
            }
        );

        //* Перехват ответа любого.
        const interceptorResponse = axiosInstance.interceptors.response.use(
            async (res: AxiosResponse) => {
                console.log('Run AxiosResponse');
                console.log(res.data);
                return res;
            },
            (error: AxiosError) => {
                console.log('#1 - Ошибка ответа !!!');

                let errorStatus: string | number = 'unknown status';
                if(error.response && 'status' in error.response) errorStatus = error.response.status;

                if(error.response && 'data' in error.response && isIError(error.response.data)) {
                    return Promise.reject(error);
                }

                modalMessageError(`Error ${errorStatus}: ошибка сервера, попробуйте позже...`);
                return Promise.reject(error);
            }
        )

        return () => {
            axiosInstanceWithAuth.interceptors.request.eject(interceptorRequestWithAuth);
            axiosInstance.interceptors.response.eject(interceptorResponse);
        }

    }, []);

    return children;
};


export default ApiInterceptors;