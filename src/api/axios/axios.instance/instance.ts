import axios , { AxiosInstance } from 'axios';


export const baseLink = `${process.env.START_URL}${process.env.PORT}`;

export const baseLinkApi = baseLink + '/api';

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: `${baseLink}/api`
});

export const axiosInstanceWithAuth: AxiosInstance = axios.create({
    baseURL: `${baseLink}/api`
});