import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR_ROOT } from '@/data/colors';
import MenuItem from '@/components/shared/MenuItem/MenuItem';
import WrapperScroll from '@/components/wrappers/WrapperScroll/WrapperScroll';
import { useHookRouter } from '@/helpers/router/useHookRouter';
import { useAppDispatch } from '@/redux/store/hooks';
import { setAppUserInfo } from '@/redux/slice/user.slice';
import IosMenuItem from '@/components/widgets/IosMenuItem/IosMenuItem';
import IosWrapperMenu from '@/components/wrappers/IosWrapperMenu/IosWrapperMenu';
import Title from '@/components/shared/Title/Title';

/**
 * @page Страница пользователя.
 */
const AdminSettings: FC = () => {
    console.info('PAGE_admin/adminSettings');
    const {appRouter} = useHookRouter();
    const dispatch = useAppDispatch();

    const exitOut = async () => {
        await AsyncStorage.clear();
        dispatch(setAppUserInfo('clear'));
        appRouter.navigate('/');
    }

    return (
        <WrapperScroll>
            <View style={styles.main} >
                <Title text='Настройки и действия' marginTop={10} fontSize={17} />
                <IosWrapperMenu>
                    <IosMenuItem
                        title='Password'
                        img={require('@/source/img/ios-icon/5.jpg')}
                        pushFunction={() => appRouter.navigate('/admin/changePassword')}
                        isShowLine={true}
                    />
                    <IosMenuItem
                        title='Выход'
                        img={require('@/source/img/ios-icon/6.jpg')}
                        pushFunction={() => exitOut()}
                    />
                </IosWrapperMenu>
            </View>
        </WrapperScroll>
    );
};

const styles = StyleSheet.create({
    main: { flex: 1 }
});

export default AdminSettings;