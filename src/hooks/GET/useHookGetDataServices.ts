import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import httpServiceService from '@/api/routes/service/service/http.service.service';
import type { ServiceDTOAndDepartmentName } from '@/api/routes/service/types/service.types';

export const useHookGetDataServices = () => {
    const [services, setServices] = useState<ServiceDTOAndDepartmentName[] | []>([]);

    useFocusEffect(
        useCallback(() => {
            httpServiceService
                .GET_getAllServices()
                .then(res => {
                    if(res) setServices(res);
                })
                .catch(error => console.error(`Error in AdminService GET_getAllServices >>> `, error));
        }, [])
    );

    return {
        /**
         * `Все услуги`
         */
        services,
        /**
         * `Установка услуг.`
         */ 
        setServices
    }
}