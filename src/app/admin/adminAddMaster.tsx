import React, { FC, useState, useRef } from 'react';
import FormMaster from '@/components/widgets/FormMaster/FormMaster';

import type { IAddMaster } from '@/api/routes/master/types/master.dto';
import type { TFormMaster } from '@/app/admin/adminMaster';


/**
 * @page `Страница добавления мастера.`
 */
const AdminAddMaster: FC = () => {

    const [data, setData] = useState<IAddMaster & {department_name: string}>({
        name: '', 
        surname: '',
        description: '',
        phone: '',
        email: '',
        password: '',
        id_department: 0,
        department_name: ''
    });

    return (
        <FormMaster titlePage='Добавление мастера' data={data} setData={setData} />
    );
};



export default AdminAddMaster;