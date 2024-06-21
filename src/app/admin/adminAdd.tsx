import { View, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import WrapperScrollMenu from '@/components/wrappers/WrapperScrollMenu/WrapperScrollMenu';
import MenuItem from '@/components/shared/MenuItem/MenuItem';
import Title from '@/components/shared/Title/Title';
import { useHookRouter } from '@/helpers/router/useHookRouter';


/**
 * @page `Страница добавления:`
 * - Департамента.
 */
const AdminAdd: FC = () => {

    const {appRouter} = useHookRouter();

    return (
        <WrapperScrollMenu>
            <View style={styles.main} >
                <Title text='Основные настройки' marginTop={10}/>
                <MenuItem
                    title='Группы услуг'
                    subTitle='добавить, редактировать, удалить'
                    img={require('@/source/img/icon/group.png')}
                    pushFunction={() => appRouter.navigate('admin/adminDepartment')}
                />
                <MenuItem
                    title='Услуги'
                    subTitle='добавить, редактировать, удалить'
                    img={require('@/source/img/icon/hair.png')}
                    pushFunction={() => appRouter.navigate('admin/adminService')}
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