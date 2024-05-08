import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import WrapperScrollMenu from '@/components/wrappers/WrapperScrollMenu/WrapperScrollMenu';
import MenuItem from '@/components/shared/MenuItem/MenuItem';
import { COLOR_ROOT } from '@/data/colors';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import type { TypeRootPage } from '@/navigation/navigation.types';


/**
 * @page `Страница добавления:`
 * - Департамента.
 */
const AdminAdd: FC = () => {

    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>();

    return (
        <WrapperScrollMenu page='AdminAdd' >
            <View style={styles.main} >
                <View style={styles.boxSettings}>
                    <Text style={styles.textSettings} >Основные настройки</Text>
                </View>
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
                    pushFunction={() => {}}
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

export default AdminAdd;