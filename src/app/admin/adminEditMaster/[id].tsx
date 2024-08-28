import { View, Text, StyleSheet } from 'react-native';
import React, { FC, useState } from 'react';
import FormMaster from '@/components/widgets/FormMaster/FormMaster';
import { useLocalSearchParams } from 'expo-router';

import type { TTypeToString } from '@/helpers/router/app.router.types';
import type { IMasterFind } from '@/api/routes/master/types/master.dto';
import type { TFormMaster } from '../adminMaster';


/**
 * @component
 * @example 
 * @returns {JSX.Element}
 */
const AdminEditMaster: FC = () => {
    console.info('PAGE_admin/adminEditMaster/[id]');
    const  { 
        id, name, surname, description, phone, email, picture, access_ban, id_department, department_name
    } = useLocalSearchParams<TTypeToString<IMasterFind>>();

    // department_name, id_department, 

    if(!id || !name || !surname || !description || !phone || !picture || !access_ban || !email) return;

    const [data, setData] = useState<TFormMaster>({
        id: Number(id),
        picture,
        access_ban: Number(access_ban),
        name,
        surname,
        description,
        phone,
        email,
        id_department: id_department ? Number(id_department) : undefined,
        department_name: department_name ?? undefined,
        password: undefined
    });

    return (
        <FormMaster titlePage='Редактирование мастера' data={data} setData={setData} />
    );
};

const styles = StyleSheet.create({
});

export default AdminEditMaster;