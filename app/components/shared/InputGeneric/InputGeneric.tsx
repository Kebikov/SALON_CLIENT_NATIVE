import { View, Text, StyleSheet, TextInput, Image, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import React, { FC } from 'react';
import { TKeyStateCreateAccount } from '@/pages/AuthCreateAccount/AuthCreateAccount';
import { COLOR_ROOT } from '@/data/colors';


interface IInputGeneric {
    /**
     * Функция изминения состояния у формы.
     * @param text Передаваемый текст с поля ввода.
     * @param key Ключ в обьекте состояния формы.
     * @returns void
     */
    onChangeForm: (text: NativeSyntheticEvent<TextInputChangeEventData>, keyName: string) => void;
    /**
     * Плейсхолдер.
     */
    placeholder: string;
    /**
     * Ключ в обьекте состояния формы.
     */
    keyName: string;
    /**
     * Изображение иконки в поле ввода.
     */
    img: number;
    /**
     * Значение поля.
     */
    value?: string;
}


/**
 * @shared `Универсальное поле для ввода текста.`
 * - Кроме пароля.
 * @param onChangeForm Функция изминения состояния у формы.
 * @param placeholder Плейсхолдер.
 * @param keyName Ключ в обьекте состояния формы.
 * @param img Изображение иконки в поле ввода.
 * @param value ? Значение поля.
 * @example <InputGeneric onChangeForm={#} placeholder={#} key={#} img={#} />
 */
const InputGeneric: FC<IInputGeneric> = ({onChangeForm, placeholder, keyName, img, value = undefined}) => {
    return (
        <View style={styles.boxInput} >
            <TextInput 
                style={styles.input} 
                placeholder={placeholder} 
                onChange={text => onChangeForm(text, keyName)} 
                value={value}
            />
            <Image style={styles.icon} source={img} />
        </View>
    );
};

const styles = StyleSheet.create({
    boxInput: {
        position: 'relative',
        marginTop: 15,
        width: '100%'
    },
    input: {
        backgroundColor: COLOR_ROOT.BACKGROUND_INPUT,
        height: 55,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 50,
        fontSize: 17,
        fontWeight: '400',
        color: COLOR_ROOT.GRAY
    },
    icon: {
        position: 'absolute',
        top: '50%',
        left: 15,
        width: 20,
        height: 20,
        marginTop: -10
    },
});

export default InputGeneric;