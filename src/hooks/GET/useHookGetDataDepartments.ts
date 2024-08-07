import { useCallback, useState } from 'react';
import httpDepartmentService from '@/api/routes/department/service/http.department.service';
import { useFocusEffect } from 'expo-router';

import type { DepartmentDTO } from "@/api/routes/department/types/department.types";


/**
 * `Hook для получения информации о всех группах.`
 */
export const useHookGetDataDepartments = () => {

    const [dataDepartments, setDataDepartments] = useState<DepartmentDTO[]>([]);

    useFocusEffect(
        useCallback(() => {

            httpDepartmentService.GET_getDepartments()
                .then(res => {
                    if(!res) return;
                    setDataDepartments(res);
                })
                .catch(error => console.error('Error in [useHookGetDataDepartments] >>> ', error));

            return () => {}
        }, [])
        
    );


    return {
        dataDepartments,
        setDataDepartments
    }
}