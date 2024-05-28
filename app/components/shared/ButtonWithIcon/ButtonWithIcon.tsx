import { View, Text, StyleSheet, Image, Pressable, Vibration } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';



interface IButtonWithIcon {
    /**
     * Функция срабатываюшая после нажатия на кнопку.
     */
    pushButton: Function;
    /**
     * Текст кнопки.
     */
    title: string;
    /**
     * Отступ с верху.
     */
    marginTop?: number;
    /**
     * Иконка кнопки(по умолчании конверт почты)
     */
    img?: number;
}


/**
 * @component `Кнопка c иконкой.`
 * @param title Текст кнопки.
 * @param pushButton Функция срабатываюшая после нажатия на кнопку.
 * @param marginTop ? Отступ с верху.
 * @param img ? Иконка кнопки(по умолчании конверт почты)
 */
const ButtonWithIcon: FC<IButtonWithIcon> = ({title, pushButton, marginTop, img = require('@/source/img/logo/email.png')}) => {


    return (
        <Pressable 
            style={[styles.main, {marginTop}]}
            onPress={() => {
                    Vibration.vibrate([7, 8, 10]);
                    pushButton();
                }
            }
        >
            <View style={styles.container}>
                <Image source={img} style={styles.img} />
                <Text style={styles.text} >{title}</Text>
            </View>
            
        </Pressable>
    );
};


const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: 60,
        borderRadius: 35,
        backgroundColor: COLOR_ROOT.MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        position: 'relative'
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        paddingLeft: 30,
        color: 'white'
    },
    img:{
        position: 'absolute',
        left: -10,
        top: 3,
        width: 20,
        height:20
    }
});


export default ButtonWithIcon;