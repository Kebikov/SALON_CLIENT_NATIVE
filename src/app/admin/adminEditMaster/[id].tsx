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

    const  { 
        id, 
        name, surname, description, phone, email, picture, access_ban, id_department,  department_name
    } = useLocalSearchParams<TTypeToString<IMasterFind>>();

    // department_name, id_department, 

    if(!id || !name || !surname || !description || !phone || !picture || !access_ban || !id_department || !email) return;

    const [data, setData] = useState<TFormMaster>({
        id: undefined,
        picture: undefined,
        access_ban: undefined,
            name: '',
            surname: '',
            description: '',
            phone: '',
            email: '',
            id_department: null,
            department_name: '',
            password: undefined
    });



    //console.log(id, name, surname, description, phone, picture, access_ban, id_department, email, department_name);

    return (
        <></>
        // <FormMaster titlePage='Редактирование мастера' data={data} setData={setData} />
    );
};

const styles = StyleSheet.create({
});

export default AdminEditMaster;