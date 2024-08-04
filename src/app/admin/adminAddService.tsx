import FormService from '@/components/widgets/FormService/FormService';
import React, { FC, useState } from 'react';
import type { ServiceDTOAndDepartmentName } from '@/api/routes/service/types/service.types';


/**
 * @page `Страница для добавления услуги.`
 */
const AdminAddService: FC = () => { 

    const [data, setData] = useState<ServiceDTOAndDepartmentName>({ 
        id: 0,
        title: '',
        description: '',
        price: 0,
        time: 0,
        id_department: 0,
        department_name: '',
        img: ''
    });

    return (
        <FormService titlePage='Добавление услуги' data={data} setData={setData} />
    );
};


export default AdminAddService;