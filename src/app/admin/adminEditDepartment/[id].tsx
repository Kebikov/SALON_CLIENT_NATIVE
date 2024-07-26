import { View, StyleSheet, Text } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import WrapperScroll from '@/components/wrappers/WrapperScroll/WrapperScroll';
import DepartmentForm from '@/components/shared/DepartmentForm/DepartmentForm';
import httpDepartmentService from '@/api/routes/department/service/http.department.service';
import { useHookCheckErrorResponce } from '@/hooks/useHookCheckErrorResponce';
import { useLocalSearchParams } from 'expo-router';
import { useHookRouter } from '@/helpers/router/useHookRouter';

import type { DepartmentDTO } from "@/api/routes/department/types/department.types";


/**
 * @page Страница редактирования группы.
 */
const AdminEditDepartment: FC = () => {

    const {router} = useHookRouter();

    const { id, name, discription, icon } = useLocalSearchParams<{ discription: string, icon: string, id: string, name: string }>();

    const {modalMessageError, isMessage} = useHookCheckErrorResponce();

    const pressEditDepertment = async (data: Omit<DepartmentDTO, 'id'>) => {
        if(!data.name) return modalMessageError('Нет группы', 'Вы не ввели имя создаваемой группы.');
        if(!data.discription) return modalMessageError('Нет описания', 'Вы не ввели описание для создаваемой группы.'); 
        if(!data.icon) return modalMessageError('Нет иконки', 'Вы не выбрали иконку для создаваемой группы.');
        const result = await httpDepartmentService.PATCH_patchDepartment({...data, id: Number(id)});
        if(!result) return;
        isMessage(result);

        router.back();
    }


    return (
        <WrapperScroll titlePage='Редактирование группы' >
            <View style={styles.main} >
                <DepartmentForm
                    initialData={{
                        name: name,
                        discription: discription,
                        icon: icon
                    }}
                    titleForButton='редактировать'
                    handlePressButton={(data: Omit<DepartmentDTO, 'id'>) => pressEditDepertment(data)}
                />
            </View>
        </WrapperScroll>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: 10
    }
});

export default AdminEditDepartment;