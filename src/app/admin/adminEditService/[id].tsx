import { View, Text, StyleSheet } from 'react-native';
import React, { FC, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import FormService from '@/components/widgets/FormService/FormService';
import type { ServiceDTOAndDepartmentName } from '@/api/routes/service/types/service.types';
import type { TTypeToString } from '@/helpers/router/app.router.types';


/**
 * @page Страница редактирования услуги.
 */
const AdminEditService: FC = () => {

    const  { id, title, description, price, time, id_department, name, img } = useLocalSearchParams<TTypeToString<ServiceDTOAndDepartmentName>>();

    if(!id || !title || !description || !price || !time || !img) return;

    const [data, setData] = useState<ServiceDTOAndDepartmentName>({ 
        id: Number(id),
        title: title,
        description: description,
        price: Number(price),
        time: Number(time),
        id_department: id_department ? Number(id_department) : 0,
        name: name ? name : '',
        img
    });

    return (
        <FormService titlePage='Редактирование услуги' data={data} setData={setData} />
    );
};

const styles = StyleSheet.create({
});

export default AdminEditService;