import { View, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import WrapperScrollMenu from '@/components/wrappers/WrapperScrollMenu/WrapperScrollMenu';
import MenuItem from '@/components/shared/MenuItem/MenuItem';
import Title from '@/components/shared/Title/Title';
import useHookNavigate from '../../hooks/useHookNavigate';


/**
 * @page `Страница добавления:`
 * - Департамента.
 */
const AdminAdd: FC = () => {

    const {navigate} = useHookNavigate();

    return (
        <WrapperScrollMenu page='AdminAdd' >
            <View style={styles.main} >
                <Title text='Основные настройки' marginTop={10}/>
                <MenuItem
                    title='Группы услуг'
                    subTitle='добавить, редактировать, удалить'
                    img={require('@/source/img/icon/group.png')}
                    pushFunction={() => navigate('AdminDepartment')}
                />
                <MenuItem
                    title='Услуги'
                    subTitle='добавить, редактировать, удалить'
                    img={require('@/source/img/icon/hair.png')}
                    pushFunction={() => navigate('AdminService')}
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