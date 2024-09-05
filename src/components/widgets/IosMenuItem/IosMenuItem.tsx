import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import VibrationApp from '@/helpers/helpersForComponents/vibration/VibrationApp';

type TArrow = 'default' | 'pink' | 'main';

interface IIosMenuItem {
    title: string;
    img: number;
    pushFunction: Function;
    isShowLine?: boolean;
    marginTop?: number;
    arrowColor?: TArrow;
}


/**
 * @shared `Пункт меню в настройках под IOS`
 * @param title Текст title.
 * @param img Изображение иконки в меню.
 * @param pushFunction Функция срабатываюшя при нажатии на пункт меню.
 * @optional
 * @param isShowLine ? Показывать ли линию под пунктом меню.
 * @param marginTop ? Отступ с верху.
 */
const IosMenuItem: FC<IIosMenuItem> = ({
    title, 
    img, 
    pushFunction, 
    isShowLine = false, 
    marginTop = 0,
    arrowColor = 'default'
}) => {

    const arrow = {
        pink: require('@/source/img/icon-menu/arrow.png'),
        default: require('@/source/img/icon-menu/arrow-grey.png'),
        main: require('@/source/img/icon-menu/arrow-main.png')
    }

    return (
        <Pressable 
            onPress={() => {
                VibrationApp.pressButton();
                pushFunction();
            }}
            style={[styles.main, {marginTop, borderBottomWidth: isShowLine ? 1 : 0}]} 
        >
            <View style={styles.boxImg}>
                <Image style={styles.img} source={img} />
            </View>
            <View style={styles.boxText} >
                <View style={styles.leftItem} >
                    <Text style={styles.textTitle} >{title}</Text>
                </View>
                <View style={styles.rightItem} >
                    <Image
                        style={styles.img}
                        source={arrow[arrowColor]}
                    />
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 2,
        borderColor: 'rgba(0, 0, 0, .15)',
    },
    //* Box 
    boxImg: {
        aspectRatio: 1,
        height: '100%',
        padding: 7
    },
    boxText: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10,
    },
    //* Item 
    leftItem: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightItem: {
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 25
    },
    //* Elem 
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 8
    },
    textTitle: {
        fontSize: 15,
        color: COLOR_ROOT.BLACK,
        fontWeight: '500'
    }
});

export default IosMenuItem;
