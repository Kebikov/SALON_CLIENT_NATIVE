import React, { FC, useCallback, useMemo, useRef, useState, useEffect } from 'react';
import httpDepartmentService from '@/api/routes/department/service/http.department.service';
import type { IDataDepartmentAndId } from '@/api/routes/department/types/department.dto';
import { useFocusEffect } from '@react-navigation/native';



/**
 * `Hook для получения информации о всех группах.`
 * @example 
 * @return Object 
 * { dataDepartments: IDataDepartmentAndId[] }
 */
export const useHookGetDataDepartments = () => {


    const [dataDepartments, setDataDepartments] = useState<IDataDepartmentAndId[]>([]);

    useFocusEffect(
        useCallback(() => {
            httpDepartmentService.GET_getDepartment()
            .then(res => {
                if(!res) return;
                setDataDepartments(res);
            })
            .catch(error => console.error(error));

            return () => {}
        }, [])
    );


    return {
        dataDepartments
    }
}