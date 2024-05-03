import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import type { TypeRootPage } from '@/navigation/navigation.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR_ROOT } from '@/data/colors';
import MenuItem from '@/components/shared/MenuItem/MenuItem';
import WrapperScrollMenu from '@/components/wrappers/WrapperScrollMenu/WrapperScrollMenu';

/**
 * @page Страница пользователя.
 */
const User: FC = () => {

    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>()

    const exitOut = async () => {
        await AsyncStorage.clear();
        navigate('Auth');
    }


    return (
        <WrapperScrollMenu page='User' >
            <View style={styles.main} >
                <View style={styles.box} >
                    <View style={styles.boxSettings}>
                        <Text style={styles.textSettings} >Настройки и действия</Text>
                    </View>
                    <MenuItem 
                        title='Password' 
                        subTitle='Изминение пароля пользователя' 
                        img={require('@/source/img/icon-menu/password-1.png')} 
                        pushFunction={() => navigate('ChangePassword')}
                    />
                    <MenuItem 
                        title='Выход' 
                        subTitle='Выход из аккауна' 
                        img={require('@/source/img/icon-menu/exit.png')} 
                        pushFunction={() => exitOut()}
                        isShowArrow={false}
                    />
                </View>
            </View>
        </WrapperScrollMenu>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    box: {

    },
    exitButton: {
        marginTop: 20,
        height: 50,
        backgroundColor: COLOR_ROOT.PINK,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton: {
        color: 'white',
        fontSize: 17
    },
    boxSettings: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10
    },
    textSettings: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: '600',
        color: COLOR_ROOT.BLACK
    }
});

export default User;