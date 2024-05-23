import { View, StyleSheet, Image, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import React, { FC, useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import WrapperScrollMenu from '@/components/wrappers/WrapperScrollMenu/WrapperScrollMenu';
import HeaderTitle from '@/components/widgets/HeaderTitle/HeaderTitle';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import MenuItem from '@/components/shared/MenuItem/MenuItem';
import { COLOR_ROOT } from '@/data/colors';
import { baseLink } from '@/api/axios/axios.instance/instance';
import Title from '@/components/shared/Title/Title';
import QuestionHOC from '@/components/wrappers/QuestionHOC/QuestionHOC';
import httpDepartmentService from '@/api/routes/department/service/http.department.service';
import { useHookCheckErrorResponce } from '@/hooks/useHookCheckErrorResponce';
import type { TypeRootPage } from '@/navigation/navigation.types';
import type { TPageAdminAddDepartmentForm } from '@/navigation/navigation.types';
import DepartmentForm from '@/components/shared/DepartmentForm/DepartmentForm';



/** 
 * @table `Department - Таблица с группами.`
 * @param name - Имя группы.
 * @param discription - Описание группы.
 * @param icon - Иконка группы, например: "16.png"
 */
export interface IDataDepartment {
    name: string;
    discription: string;
    icon: string;
}


/**
 * @page `Страница с формой для добавления департамента(группы).`
 */
const AdminAddDepartmentForm: FC<TPageAdminAddDepartmentForm> = ({route}) => {

    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>();
    const {modalMessageError, isMessage} = useHookCheckErrorResponce();
    const choice = route.params.choice;

    const onAddDepartment = async (data: Omit<IDataDepartment, 'icon'>) => {
        if(!data.name) return modalMessageError('Нет группы', 'Вы не ввели имя создаваемой группы.');
        if(!data.discription) return modalMessageError('Нет описания', 'Вы не ввели описание для создаваемой группы.'); 
        if(!choice) return modalMessageError('Нет иконки', 'Вы не выбрали иконку для создаваемой группы.');
        const result = await httpDepartmentService.POST_createDepartment({
            name: data.name,
            discription: data.discription,
            icon: choice
        });
        if(!result) return;
        isMessage(result);
        navigate('AdminAddDepartment');
    };

    return (
        <WrapperScrollMenu page='AdminAddDepartmentForm' >
            <HeaderTitle text='Добавление группы' />
            <View style={styles.main} >
                <DepartmentForm choice={choice} handlePressButton={onAddDepartment} />
            </View>
        </WrapperScrollMenu>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: 10
    },
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

export default AdminAddDepartmentForm;