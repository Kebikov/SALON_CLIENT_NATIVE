import { View, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import WrapperScroll from '@/components/wrappers/WrapperScroll/WrapperScroll';
import httpDepartmentService from '@/api/routes/department/service/http.department.service';
import { useHookCheckErrorResponce } from '@/hooks/useHookCheckErrorResponce';
import DepartmentForm from '@/components/shared/DepartmentForm/DepartmentForm';
import { useHookRouter } from '@/helpers/router/useHookRouter';
import type { DepartmentDTO } from "@/api/routes/department/types/department.types";


/**
 * @page `Страница с формой для добавления департамента(группы).`
 */
const AdminAddDepartment: FC = () => {
    console.info('PAGE_admin/adminAddDepartment');
    const {appRouter} = useHookRouter();
    const {modalMessageError, isMessage} = useHookCheckErrorResponce();

    const onAddDepartment = async (data: Omit<DepartmentDTO, 'id'>) => {
        if(!data.name) return modalMessageError('Нет группы', 'Вы не ввели имя создаваемой группы.');
        if(!data.discription) return modalMessageError('Нет описания', 'Вы не ввели описание для создаваемой группы.'); 
        if(!data.icon) return modalMessageError('Нет иконки', 'Вы не выбрали иконку для создаваемой группы.');
        const result = await httpDepartmentService.POST_createDepartment({
            name: data.name,
            discription: data.discription,
            icon: data.icon
        });
        if(!result) return;
        isMessage(result);
        appRouter.navigate('/admin/adminDepartment');
    };

    return (
        <WrapperScroll titlePage='Добавление группы' >
            <View style={styles.main} >
                <DepartmentForm 
                    handlePressButton={onAddDepartment} 
                />
            </View>
        </WrapperScroll>
    );
};

const styles = StyleSheet.create({
    main: {flex: 1, paddingHorizontal: 10},
    item: {
        width: '25%',
        height: '100%',
        aspectRatio: 1 / 1,
        padding: 7
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    boxImg: {
        flex: 1,
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2
    },
    img: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%'
    },
});

export default AdminAddDepartment;