import axios , { AxiosInstance, AxiosRequestHeaders } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IResRegistration } from './routes/registration/types/registration.types';
import { asyncStorageSaveUser } from '@/helpers/save/saveUserInAsyncStorage';
import { TGIResRegistration } from '@/helpers/type-guards/TGIResRegistration';



export const baseLink = `${process.env.START_URL}${process.env.PORT}`;


const axiosInterceptors = (instance: AxiosInstance) => {
    instance.interceptors.request.use(
        async (req) => {
            const userJson = await AsyncStorage.getItem('@user');
            if(!userJson) return req;
            const {id, accessToken, refreshToken, expiresIn}: IResRegistration = JSON.parse(userJson);

            //* Токен живой.
            if(new Date().getTime() < expiresIn && accessToken && id) {
                console.info('Token живой.');
                req.headers = {...req.headers, 'Authorization': `Bearer ${accessToken} ${id}`} as AxiosRequestHeaders;
                return req;
            }

            //* Токен просрочен.
            if(expiresIn && id && new Date().getTime() > expiresIn) {
                const {data}: {data: unknown} = await axios.post(`${baseLink}/api/registration/updateToken`, {id, refreshToken});
                if(TGIResRegistration(data)) {
                    console.info('Запись новых токенов...');
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
}

export const authAxios: AxiosInstance = axios.create(
    {
        baseURL: `${baseLink}/api`,
    }
);


axiosInterceptors(authAxios);








