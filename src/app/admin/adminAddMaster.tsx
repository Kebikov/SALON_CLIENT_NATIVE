import React, { FC, useState, useRef } from 'react';
import FormMaster from '@/components/widgets/FormMaster/FormMaster';

import type { IAddMaster } from '@/api/routes/master/types/master.dto';
import type { TFormMaster } from '@/app/admin/adminMaster';


/**
 * @page `Страница добавления мастера.`
 */
const AdminAddMaster: FC = () => {

    const [data, setData] = useState<TFormMaster>({
        id: undefined,
        picture: undefined,
        access_ban: undefined,
        name: '',
        surname: '',
        description: '',
        phone: '',
        email: '',
        id_department: undefined,
        department_name: undefined,
        password: undefined
    });

    return (
        <FormMaster titlePage='Добавление мастера' data={data} setData={setData} />
    );
};



export default AdminAddMaster;