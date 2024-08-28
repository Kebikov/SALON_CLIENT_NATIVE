import { View, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import WrapperScroll from '@/components/wrappers/WrapperScroll/WrapperScroll';
import MenuItem from '@/components/shared/MenuItem/MenuItem';
import Title from '@/components/shared/Title/Title';
import { useHookRouter } from '@/helpers/router/useHookRouter';


/**
 * @page `Страница добавления:`
 * - Департамента.
 */
const AdminAdd: FC = () => {
    console.info('PAGE_admin/adminAdd');
    const {appRouter} = useHookRouter();

    return (
        <WrapperScroll>
            <View style={styles.main} >
                <Title text='Добавление данных' marginTop={10}/>
                <MenuItem
                    title='Группы'
                    subTitle='добавить, редактировать, удалить'
                    img={require('@/source/img/icon/group.png')}
                    pushFunction={() => appRouter.navigate('/admin/adminDepartment')}
                    arrowColor='grey'
                />
                <MenuItem
                    title='Услуги'
                    subTitle='добавить, редактировать, удалить'
                    img={require('@/source/img/icon/hair.png')}
                    pushFunction={() => appRouter.navigate('/admin/adminService')}
                    arrowColor='grey'
                />
                <MenuItem
                    title='Команда'
                    subTitle='добавить, редактировать, удалить'
                    img={require('@/source/img/icon/masters.png')}
                    pushFunction={() => appRouter.navigate('/admin/adminMaster')}
                    arrowColor='grey'
                />
                <Title text='Работа салона' marginTop={10}/>
                <MenuItem
                    title='Мастера'
                    subTitle='график работы'
                    img={require('@/source/img/icon/masters.png')}
                    pushFunction={() => appRouter.navigate('/admin/adminAllMasters')}
                    arrowColor='grey'
                />
            </View>
        </WrapperScroll>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1
    }
});

export default AdminAdd;