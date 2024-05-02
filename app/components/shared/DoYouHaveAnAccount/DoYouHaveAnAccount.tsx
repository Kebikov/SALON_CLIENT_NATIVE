import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { FC } from 'react';


interface IDoYouHaveAnAccount {
    /**
     * Функция срабатываюшяя при нажатии на кнопку.
     */
    pushButton: Function;
    /**
     * Текст перед кнопкой.
     */
    title: string;
    /**
     * Текст кнопки.
     */
    textButton: string;
    /**
     * Цвет текста перед кнопкой.
     */
    color: string;
}

// 'Уже есть аккаунт ?' : 'Нет аккаунта ?'
// ' Войти' : ' Регистрация'

/**
 * @shared Текст "Уже есть аккаунт ?" и "Войти"
 * @param pushButton Функция срабатываюшяя при нажатии на кнопку.
 * @param title Текст перед кнопкой.
 * @param textButton Текст кнопки.
 * @param color Цвет текста перед кнопкой.
 */
const DoYouHaveAnAccount: FC<IDoYouHaveAnAccount> = ({pushButton, title, textButton, color}) => {

    return (
        <View style={styles.textBox} >
            <Text style={[styles.text, {color}]} >{title}</Text>
            <Pressable onPress={() => pushButton()} >
                <Text style={styles.textExit} >{textButton}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    textBox: {
        marginTop: 15,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16
    },
    textExit: {
        color: 'orange',
        fontSize: 16
    }
});

export default DoYouHaveAnAccount;