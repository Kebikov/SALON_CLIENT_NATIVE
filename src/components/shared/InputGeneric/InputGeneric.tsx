import { View, Text, StyleSheet, TextInput, Image, NativeSyntheticEvent, TextInputChangeEventData, Platform } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';



interface IInputGeneric<T> {
    /**
     * Функция изминения состояния у формы.
     * @param text Передаваемый текст с поля ввода.
     * @param key Ключ в обьекте состояния формы.
     */
    onChangeForm: (text: NativeSyntheticEvent<TextInputChangeEventData>, keyName: T) => void;
    placeholder: string;
    keyName: T;
    img: number;
    value?: string;
    lines?: number;
    keyboardType?: 'default' | 'numeric';
    maxLength?: number;
    marginTop?: number;
}


/**
 * @shared `Универсальное поле для ввода текста.`
 * - Кроме пароля.
 * @param onChangeForm Функция изминения состояния у формы.
 * @param placeholder Плейсхолдер.
 * @param keyName Ключ в обьекте состояния формы.
 * @param img Изображение иконки в поле ввода.
 * @optional
 * @param value ? Значение поля.
 * @param lines ? Количество линий в input.
 * @param keyboardType ? Тип клавиатуры для ввода.
 * @param maxLength ? Максимальная длинна текста.
 * @param marginTop ? Отступ с верху.
 * @example <InputGeneric onChangeForm={#} placeholder={#} key={#} img={#} />
 */
const InputGeneric = <T,>({
    onChangeForm, 
    placeholder, 
    keyName, 
    img, 
    value = undefined, 
    lines = 1,
    keyboardType = 'default',
    maxLength,
    marginTop = 10
}: IInputGeneric<keyof T>) => {
    return (
        <View style={[stylesGeneric.boxInput, stylesGeneric.shadowTop, {marginTop}]} >
            <TextInput 
                multiline
                numberOfLines={lines}
                style={[stylesGeneric.input]} 
                placeholder={placeholder} 
                placeholderTextColor={COLOR_ROOT.LIGHT_ICON}
                onChange={text => onChangeForm(text, keyName)} 
                value={value}
                keyboardType={keyboardType}
                maxLength={maxLength}
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





















