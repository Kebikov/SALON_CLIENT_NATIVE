import { useState, useEffect } from 'react';
import httpMasterService from '@/api/routes/master/service/http.master.service';

import type { IGetServiceOfMaster } from '@/api/routes/master/types/master.dto';


export const useHookGetServiceOfMaster = (id: number) => {

    const [serviceOfMaster, setServiceOfMaster] = useState<IGetServiceOfMaster[] | null>(null);

    useEffect(() => {
        httpMasterService.GET_getServicesOfMaster(id)
        .then(res => {
            if(!res) return;
            setServiceOfMaster(res);
        })
        .catch(error => console.error('Error in [useHookGetServiceOfMaster] >>> ', error));
    }, []);

    return {
        serviceOfMaster,
        setServiceOfMaster
    }
}