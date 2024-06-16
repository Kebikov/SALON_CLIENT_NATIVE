import { View, Text, StyleSheet, TextInput, Image, NativeSyntheticEvent, TextInputChangeEventData, Platform } from 'react-native';
import React, { FC } from 'react';
import { TKeyStateCreateAccount } from '@/pages/AuthCreateAccount/AuthCreateAccount';
import { COLOR_ROOT } from '@/data/colors';



interface IInputGeneric {
    /**
     * Функция изминения состояния у формы.
     * @param text Передаваемый текст с поля ввода.
     * @param key Ключ в обьекте состояния формы.
     */
    onChangeForm: (text: NativeSyntheticEvent<TextInputChangeEventData>, keyName: string) => void;
    placeholder: string;
    keyName: string;
    img: number;
    value?: string;
    lines?: number;
    keyboardType?: 'default' | 'numeric';
}


/**
 * @shared `Универсальное поле для ввода текста.`
 * - Кроме пароля.
 * @param onChangeForm Функция изминения состояния у формы.
 * @param placeholder Плейсхолдер.
 * @param keyName Ключ в обьекте состояния формы.
 * @param img Изображение иконки в поле ввода.
 * @param value ? Значение поля.
 * @param lines ? Количество линий в input.
 * @param keyboardType ? Тип клавиатуры для ввода.
 * @example <InputGeneric onChangeForm={#} placeholder={#} key={#} img={#} />
 */
const InputGeneric: FC<IInputGeneric> = ({
    onChangeForm, 
    placeholder, 
    keyName, 
    img, 
    value = undefined, 
    lines = 1,
    keyboardType = 'default'
}) => {
    return (
        <View style={[stylesGeneric.boxInput, stylesGeneric.shadowTop]} >
            <TextInput 
                multiline
                numberOfLines={lines}
                style={[stylesGeneric.input]} 
                placeholder={placeholder} 
                placeholderTextColor={COLOR_ROOT.LIGHT_ICON}
                onChange={text => onChangeForm(text, keyName)} 
                value={value}
                keyboardType={keyboardType}
            />
            <Image style={stylesGeneric.icon} source={img} />
        </View>
    );
};


export const stylesGeneric = StyleSheet.create({
    shadowTop: {
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: .3,
        shadowRadius: 2,
        shadowColor: '#000',
        elevation: 3
    },
    shadowBottom: {
        shadowOffset: {
            width: 0,
            height: -2
        },
        shadowOpacity: .2,
        shadowRadius: 2,
        shadowColor: '#CCC',
        elevation: 3
    },
    boxInput: {
        position: 'relative',
        marginTop: 10,
        width: '100%',
        borderRadius: 30
    },
    input: {
        backgroundColor: COLOR_ROOT.BACKGROUND_INPUT,
        borderRadius: 30,
        paddingVertical: Platform.OS === 'ios' ? 13 : 10,
        paddingHorizontal: 50,
        fontSize: Platform.OS === 'ios' ? 17 : 15,
        fontWeight: '400',
        color: COLOR_ROOT.GRAY
    },
    icon: {
        position: 'absolute',
        zIndex: 1,
        top: '50%',
        left: 15,
        width: 20,
        height: 20,
        marginTop: -10
    },
});

export default InputGeneric;