import { View, Text, StyleSheet } from 'react-native';
import React, { FC, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import FormService from '@/components/widgets/FormService/FormService';
import type { ServiceDTOAndDepartmentName } from '@/api/routes/service/types/service.types';
import type { TNumbersToString } from '@/helpers/router/app.router.types';


/**
 * @page Страница редактирования услуги.
 */
const AdminEditService: FC = () => {

    const  { id, title, description, price, time, id_department, name, img } = useLocalSearchParams<TNumbersToString<ServiceDTOAndDepartmentName>>();

    if(!id || !title || !description || !price || !time) return;

    const [data, setData] = useState<ServiceDTOAndDepartmentName>({ 
        id: 0,
        title: title,
        description: description,
        price: Number(price),
        time: Number(time),
        id_department: id_department ? Number(id_department) : 0,
        name: name ? name : '',
        img: img ? img : ''
    });

    return (
        <FormService titlePage='Редактирование услуги' data={data} setData={setData} />
    );
};

const styles = StyleSheet.create({
});

export default AdminEditService;