import { View, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import WrapperScroll from '@/components/wrappers/WrapperScroll/WrapperScroll';
import MenuItem from '@/components/shared/MenuItem/MenuItem';
import Title from '@/components/shared/Title/Title';
import { useHookRouter } from '@/helpers/router/useHookRouter';
import IosMenuItem from '@/components/widgets/IosMenuItem/IosMenuItem';
import IosWrapperMenu from '@/components/wrappers/IosWrapperMenu/IosWrapperMenu';


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
                <Title text='Добавление данных' marginTop={10} fontSize={17}/>
                <IosWrapperMenu>
                    <IosMenuItem
                        title='Группы'
                        img={require('@/source/img/ios-icon/2.jpg')}
                        pushFunction={() => appRouter.navigate('/admin/adminDepartment')}
                        isShowLine={true}
                    />
                    <IosMenuItem
                        title='Услуги'
                        img={require('@/source/img/ios-icon/3.jpg')}
                        pushFunction={() => appRouter.navigate('/admin/adminService')}
                        isShowLine={true}
                    />
                    <IosMenuItem
                        title='Мастера'
                        img={require('@/source/img/ios-icon/4.jpg')}
                        pushFunction={() => appRouter.navigate('/admin/adminMaster')}
                    />
                </IosWrapperMenu>

                <Title text='Работа салона' marginTop={10} fontSize={17} />
                <IosWrapperMenu>
                    <IosMenuItem
                        title='График работы'
                        img={require('@/source/img/ios-icon/7.jpg')}
                        pushFunction={() => appRouter.navigate('/admin/adminTimetable')}
                        isShowLine={true}
                    />
                    <IosMenuItem
                        title='Услуги мастера'
                        img={require('@/source/img/ios-icon/8.jpg')}
                        pushFunction={() => appRouter.navigate('/admin/adminTimetable')}
                    />
                </IosWrapperMenu>
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