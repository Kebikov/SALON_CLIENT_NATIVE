import { useRef, useState } from 'react';
import { useHookGetDataServices } from '@/hooks/GET/useHookGetDataServices';
import { useHookGetDataDepartments } from '@/hooks/GET/useHookGetDataDepartments';

import type { IRefBottomModalSheet } from '@/components/wrappers/BottomModalSheet/types';
import type { DepartmentDTO } from "@/api/routes/department/types/department.types";


/**
 * `Hook для фильтрации сервисов по группе.` 
 */
export const useFilterService = () => {

    const notFilter = 'Все услуги';
    const notDepartment = 'Нет группы';

    const [curentFilter, setCurentFilter] = useState<string>(notFilter);
    const {dataDepartments} = useHookGetDataDepartments();
    const {services, setServices} = useHookGetDataServices();

    const bottomSheetRef = useRef<IRefBottomModalSheet>(null);
    const openList = () => bottomSheetRef.current?.openModal();
    const closeList = () => bottomSheetRef.current?.closeModal();

    let sheetDepartments: DepartmentDTO[] = [
        {
            id: 0, name: notFilter, discription: '', icon: 'icon все услуги'
        },
        {
            id: 0, name: notDepartment, discription: '', icon: 'icon нет группы'
        }
    ];

    sheetDepartments = [ ...sheetDepartments, ...dataDepartments];

    const filterService = services.filter(item => {
            if(curentFilter === notFilter) {
                return item;
            }

            if(curentFilter === notDepartment && item.department_name === null) {
                return item;
            }

            if(item.department_name === curentFilter) {
                return item;
            }
        }  
    );


    return {
        bottomSheetRef,
        openList,
        sheetDepartments,
        setCurentFilter,
        closeList,
        services,
        setServices,
        filterService,
        curentFilter,
        notFilter
    }

}