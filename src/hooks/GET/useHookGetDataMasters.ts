import { useCallback, useState } from 'react';
import httpMasterService from '@/api/routes/master/service/http.master.service';
import { useFocusEffect } from 'expo-router';

import type { IMasterFind } from '@/api/routes/master/types/master.dto';

/**
 * `Hook для получения информации о всех мастерах.`
 */
export const useHookGetDataMasters = () => {

    const [masters, setMasters] = useState<IMasterFind[]>([]);

    useFocusEffect(
        useCallback(() => {

            httpMasterService.GET_getMasterAll()
            .then(res => {
                if(!res) return;
                setMasters(res);
            })
            .catch((error) => console.error('Error in [useHookGetDataMasters]', error));

            return () => {}
        }, [])
        
    );

    return {
        masters,
        setMasters
    }

}