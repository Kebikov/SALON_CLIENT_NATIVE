import { View, Text, StyleSheet, StatusBar, Image, Pressable } from 'react-native';
import React, { FC, useState } from 'react';
import { TypeRootPage } from '@/navigation/navigation.types';
import { COLOR_ROOT } from '@/data/colors';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useAppSelector } from '@/redux/store/hooks';
import menu from './listMenu';


export type TKeyPage =  keyof TypeRootPage;

interface IBottomMenu {
    /**
     * Страница на которой находится меню.
     */
    page: TKeyPage;
}

export interface IbuttonPage {
    id: number;
    page: TKeyPage | null; 
    img: number;
}


/**
 * @widgets Нижнее меню с иконками.
 */
const BottomMenu: FC<IBottomMenu> = ({page}) => {

    const userInfo = useAppSelector(state => state.userSlice.user);
    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>();

    /**
     * Подчеркивание иконки меню текушей страницы.
     */
    const line = (pageLIne: TKeyPage) => {
        return page === pageLIne ? <View style={styles.boxImgLine}/> : null;
    };

    /**
     * Кнопка в нижнем меню.
     */
    const ButtonForMenuPage = (item: IbuttonPage): JSX.Element => {
        return(
            <Pressable style={styles.boxImg} onPress={() => item && item.page !== null ? navigate(item.page) : null} key={item.id} >
                <Image source={item.img} style={styles.icon} />
                {item.page ? line(item.page) : null}
            </Pressable>
        )
    };

    const menuItem = menu[userInfo.role];
    const listMenu = menuItem !== null ? menuItem.map(item => ButtonForMenuPage(item)) : null;

    return (
        <View style={styles.main}>
            <View style={styles.box}>
                {
                    listMenu
                }
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    main: {
        borderTopColor: 'rgba(204, 204, 204, .5)',
        borderTopWidth: 1,
        paddingTop: 10,
        paddingBottom: 10
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    boxImg: {
        width: 37,
        height: 37,
        //backgroundColor: 'red',
        padding: 5
    },
    boxImgLine: {
        width: '100%',
        height: 4,
        backgroundColor: COLOR_ROOT.MAIN_COLOR,
        borderRadius: 5
    },
    icon: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
        marginBottom: 2
    }
});


export default BottomMenu;