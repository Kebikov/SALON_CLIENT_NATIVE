import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import type { TypeRootPage } from '@/navigation/navigation.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR_ROOT } from '@/data/colors';
import WrapperScrollMenu from '@/components/wrappers/WrapperScrollMenu/WrapperScrollMenu';
import HeaderTitle from '@/components/widgets/HeaderTitle/HeaderTitle';

/**
 * @page Страница пользователя.
 */
const AdminAddGroupForm: FC = () => {

    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>()

    const exitOut = async () => {
        await AsyncStorage.clear();
        navigate('Auth');
    }


    return (
        <WrapperScrollMenu page='AdminAddGroupForm' >
            <View style={styles.main} >
                <HeaderTitle text='Добавление группы' />
            </View>
        </WrapperScrollMenu>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1
    }
});

export default AdminAddGroupForm;