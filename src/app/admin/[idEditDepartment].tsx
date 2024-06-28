import { View, StyleSheet, Text } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import WrapperMenu from '@/components/wrappers/WrappersMenu/WrappersMenu';
import DepartmentForm from '@/components/shared/DepartmentForm/DepartmentForm';
import httpDepartmentService from '@/api/routes/department/service/http.department.service';
import type { IDataDepartmentAndId, IDataDepartment } from '@/api/routes/department/types/department.dto';
import { useHookCheckErrorResponce } from '@/hooks/useHookCheckErrorResponce';
import { useLocalSearchParams } from 'expo-router';
import { useHookRouter } from '@/helpers/router/useHookRouter';


/**
 * @page Страница редактирования группы.
 * @example 
 */
const AdminEditDepartment: FC = () => {
    console.log('render AdminEditDepartment');

    const {router} = useHookRouter();

    const { id, name, discription, icon } = useLocalSearchParams<{ discription: string, icon: string, id: string, name: string }>();

    const {modalMessageError, isMessage} = useHookCheckErrorResponce();

    const pressEditDepertment = async (data: IDataDepartment) => {
        if(!data.name) return modalMessageError('Нет группы', 'Вы не ввели имя создаваемой группы.');
        if(!data.discription) return modalMessageError('Нет описания', 'Вы не ввели описание для создаваемой группы.'); 
        if(!data.icon) return modalMessageError('Нет иконки', 'Вы не выбрали иконку для создаваемой группы.');
        const result = await httpDepartmentService.PATCH_patchDepartment({...data, id: Number(id)});
        if(!result) return;
        isMessage(result);

        router.back();
    }


    return (
        <WrapperMenu titlePage='Редактирование группы'>
            <View style={styles.main} >
                    <DepartmentForm
                        initialData={{
                            name: name,
                            discription: discription,
                            icon: icon
                        }}
                        titleForButton='редактировать'
                        handlePressButton={(data: IDataDepartment) => pressEditDepertment(data)}
                    />
            </View>
        </WrapperMenu>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: 10
    }
});

export default AdminEditDepartment;