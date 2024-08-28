import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import VibrationApp from '@/helpers/helpersForComponents/vibration/VibrationApp';

type TArrow = 'default' | 'grey' | 'main';

interface IMenuItem {
    title: string;
    subTitle: string;
    img: number;
    pushFunction: Function;
    isShowArrow?: boolean;
    marginTop?: number;
    arrowColor?: TArrow;
}


/**
 * @shared `Пункт меню в настройках.`
 * @param title Текст title.
 * @param subTitle Текст под title.
 * @param img Изображение иконки в меню.
 * @param pushFunction Функция срабатываюшя при нажатии на пункт меню.
 * @param isShowArrow ? Показывать ли стрелку в конце пункта меню.
 * @param marginTop ? Отступ с верху.
 */
const MenuItem: FC<IMenuItem> = ({
    title, 
    subTitle, 
    img, 
    pushFunction, 
    isShowArrow = true, 
    marginTop = 0,
    arrowColor = 'default'
}) => {

    const arrow = {
        default: require('@/source/img/icon-menu/arrow.png'),
        grey: require('@/source/img/icon-menu/arrow-grey.png'),
        main: require('@/source/img/icon-menu/arrow-main.png')
    }

    return (
        <Pressable 
            onPress={() => {
                VibrationApp.pressButton();
                pushFunction();
            }}
            style={[styles.main,{marginTop}]} 
        >
            <View style={styles.boxImg}>
                <Image
                    style={styles.img}
                    source={img}
                />
            </View>
            <View style={styles.boxText} >
                <View style={styles.leftItem} >
                    <Text style={styles.textTitle} >{title}</Text>
                    <Text style={styles.textSubTitle} >{subTitle}</Text>
                </View>
                {
                    isShowArrow
                    ?
                    <View style={styles.rightItem} >
                        <Image
                            style={styles.img}
                            source={arrow[arrowColor]}
                        />
                    </View>
                    :
                    null
                }
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    main: {
        height: 60,
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    //* Box 
    boxImg: {
        flex: .08,
        height: '100%',
        padding: 7
    },
    boxText: {
        flex: .9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10
    },
    //* Item 
    leftItem: {
        flex: .92
    },
    rightItem: {
        flex: .08,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50
    },
    //* Elem 
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    textTitle: {
        fontSize: 16,
        color: COLOR_ROOT.BLACK,
        fontWeight: '500'
    },
    textSubTitle: {
        fontSize: 13,
        color: COLOR_ROOT.MIDDLE_GRAY,
        fontWeight: '400',
        transform: [
            {translateY: -2}
        ]
    }
});

export default MenuItem;
