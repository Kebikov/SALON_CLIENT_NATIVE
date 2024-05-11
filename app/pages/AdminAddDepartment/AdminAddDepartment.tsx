import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React, { FC } from 'react';
import WrapperScrollMenu from '@/components/wrappers/WrapperScrollMenu/WrapperScrollMenu';
import DepartmentCartAdmin from '@/components/shared/DepartmentCartAdmin/DepartmentCartAdmin';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import Discription from '@/components/shared/Discription/Discription';
import HeaderTitle from '@/components/widgets/HeaderTitle/HeaderTitle';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { TypeRootPage } from '@/navigation/navigation.types';


/**
 * @page `Страница с кнопкой добавления департамента.`
 * - С уже добавленными департаментами также.
 */
const AdminAddDepartment: FC = () => {

    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>();

    return (
        <WrapperScrollMenu page='AdminAddDepartment' >
            <HeaderTitle text='Группы услуг' />
            <View style={styles.main} >
                <Discription text='Работа с группами услуг. Для обьединения услуг в определенные группы.' marginTop={10}/>
                <DepartmentCartAdmin/>
                <ButtonWithIcon title='добавить группу' pushButton={() => navigate('AdminAddDepartmentForm', {choice: ''})} img={require('@/source/img/icon/plus-white.png')} marginTop={10} />
            </View>
        </WrapperScrollMenu> 
    );
};


const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: 10
    }
});

export default AdminAddDepartment;