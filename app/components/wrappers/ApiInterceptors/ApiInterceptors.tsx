import { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios';
import React, { FC, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IResRegistration } from '@/api/routes/registration/types/registration.types'; 
import { asyncStorageSaveUser } from '@/helpers/save/saveUserInAsyncStorage';
import { TGIResRegistration } from '@/helpers/type-guards/TGIResRegistration';
import { axiosInstance, axiosInstanceWithAuth } from '@/api/axios/axios.instance/instance';
import httpRegistrationService from '@/api/routes/registration/service/registration.service';
import { useHookCheckErrorResponce } from '@/hooks/useHookCheckErrorResponce';
import { useAppDispatch } from '@/redux/store/hooks';
import { setAppIsShowSpinner } from '@/redux/slice/modal.slice';


interface IApiInterceptors {
    children: JSX.Element | JSX.Element[];
}

/**
 * @wrapper `Оболочка для перехвата запросов к серверу.`
 * @returns {JSX.Element}
 */
const ApiInterceptors: FC<IApiInterceptors> = ({children}) => {
    
    const dispatch = useAppDispatch();
    const {isIError, modalMessageError} = useHookCheckErrorResponce();

    /**
     * Обработка входяшей ошибки.
     */
    const processError = (error: AxiosError) => {
        // Скрываем спинер загрузки.
        dispatch(setAppIsShowSpinner( {isShowSpinner: false} ));

        let errorStatus: string | number = 'unknown status';
        if(error.response && 'status' in error.response) errorStatus = error.response.status;

        if(error.response && 'data' in error.response && isIError(error.response.data)) {
            return Promise.reject(error);
        }

        modalMessageError(`Error ${errorStatus}`, 'Ошибка сервера, попробуйте позже еще раз.');
        return Promise.reject(error);
    }

    useEffect(() => {
        //* Перехват запроса без регистрации.
        const interceptorRequest = axiosInstance.interceptors.request.use(
            async (req) => {
                // Показываем спинер загрузки.
                dispatch(setAppIsShowSpinner( {isShowSpinner: true} ));
                return req;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        //* Перехват запроса с регистрацией для обновления и добавления токенов.
        const interceptorRequestWithAuth = axiosInstanceWithAuth.interceptors.request.use(
            async (req) => {
                // Показываем спинер загрузки.
                dispatch(setAppIsShowSpinner( {isShowSpinner: true} ));
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

        //* Перехват ответа без регистрации.
        const interceptorResponse = axiosInstance.interceptors.response.use(
            async (res: AxiosResponse) => {
                // Скрываем спинер загрузки.
                dispatch(setAppIsShowSpinner( {isShowSpinner: false} ));
                return res;
            },
            (error: AxiosError) => {
                return processError(error);
            }
        );

        //* Перехват ответа c регистрацией.
        const interceptorResponseWithAuth = axiosInstanceWithAuth.interceptors.response.use(
            async (res: AxiosResponse) => {
                // Скрываем спинер загрузки.
                dispatch(setAppIsShowSpinner( {isShowSpinner: false} ));
                return res;
            },
            (error: AxiosError) => {
                return processError(error);
            }
        )

        return () => {
            axiosInstance.interceptors.request.eject(interceptorRequest);
            axiosInstanceWithAuth.interceptors.request.eject(interceptorRequestWithAuth);
            axiosInstance.interceptors.response.eject(interceptorResponse);
            axiosInstanceWithAuth.interceptors.response.eject(interceptorResponseWithAuth);
        }

    }, []);

    return children;
};


export default ApiInterceptors;

