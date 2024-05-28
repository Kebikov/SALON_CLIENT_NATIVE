import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import WrapperScrollMenu from '@/components/wrappers/WrapperScrollMenu/WrapperScrollMenu';
import MenuItem from '@/components/shared/MenuItem/MenuItem';
import { COLOR_ROOT } from '@/data/colors';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import type { TypeRootPage } from '@/navigation/navigation.types';
import Discription from '@/components/shared/Discription/Discription';
import Title from '@/components/shared/Title/Title';


/**
 * @page `Страница добавления:`
 * - Департамента.
 */
const AdminAdd: FC = () => {

    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>();

    return (
        <WrapperScrollMenu page='AdminAdd' >
            <View style={styles.main} >
                <Title text='Основные настройки' marginTop={10}/>
                <MenuItem
                    title='Группы услуг'
                    subTitle='добавить, редактировать, удалить'
                    img={require('@/source/img/icon/group.png')}
                    pushFunction={() => navigate('AdminAddDepartment')}
                />
                <MenuItem
                    title='Услуги'
                    subTitle='добавить, редактировать, удалить'
                    img={require('@/source/img/icon/hair.png')}
                    pushFunction={() => navigate('Test')}
                />
                <MenuItem
                    title='Команда'
                    subTitle='добавить, редактировать, удалить'
                    img={require('@/source/img/icon/masters.png')}
                    pushFunction={() => {}}
                />
            </View>
        </WrapperScrollMenu>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1
    }
});

export default AdminAdd;