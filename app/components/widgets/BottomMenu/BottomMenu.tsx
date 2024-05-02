import { View, Text, StyleSheet, StatusBar, Image, Pressable } from 'react-native';
import React, { FC, useState } from 'react';
import { TypeRootPage } from '@/navigation/navigation.types';
import { COLOR_ROOT } from '@/data/colors';
import { useNavigation, NavigationProp } from '@react-navigation/native';


type TKeyPage =  keyof TypeRootPage;
interface IBottomMenu {
    /**
     * Страница на которой находится меню.
     */
    page: TKeyPage;
}


/**
 * @widgets Нижнее меню с иконками.
 */
const BottomMenu: FC<IBottomMenu> = ({page}) => {

    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>();

    const line = (pageLIne: TKeyPage) => {
        return page === pageLIne ? <View style={styles.boxImgLine}/> : null;
    }


    return (
        <View style={styles.main}>
            <View style={styles.box}>
                <Pressable style={styles.boxImg} onPress={() => navigate('Home')} >
                    <Image source={require('@/source/img/icon/home.png')} style={styles.icon} />
                    {line('Home')}
                </Pressable>
                <Pressable style={styles.boxImg}>
                    <Image source={require('@/source/img/icon/bookmark.png')} style={styles.icon} />
                </Pressable>
                <Pressable style={styles.boxImg}>
                    <Image source={require('@/source/img/icon/calendar.png')} style={styles.icon} />
                </Pressable>
                <Pressable style={styles.boxImg} onPress={() => navigate('User')} >
                    <Image source={require('@/source/img/icon/user.png')} style={styles.icon} />
                    {line('User')}
                </Pressable>
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