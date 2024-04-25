import axios , { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IResRegistration } from './routes/registration/types/registration.types';


export const baseLink = `${process.env.START_URL}${process.env.PORT}`;


const axiosInterceptors = (instance: AxiosInstance) => {
    instance.interceptors.request.use(
        async (res) => {
            // const user = await AsyncStorage.getItem('@user') as IResRegistration | null;

            // if(user?.refreshToken && user?.expiresIn && user.expiresIn < new )

            return res;
        }, 
        (error) => {
            console.log(error);
        }
    );
}

export const httpAuth: AxiosInstance = axios.create({
    baseURL: `${baseLink}/api`
});


axiosInterceptors(httpAuth);





