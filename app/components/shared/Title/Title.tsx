import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';


interface ITitle {
    text: string;
    marginTop?: number;
}


/**
 * @shared `Текст загаловка.`
 * @param text Текст загаловка.
 * @param marginTop ? Отступ с верху.
 * @example <Title text={#} marginTop={?#} />
 */
const Title: FC<ITitle> = ({text, marginTop = 0}) => {

    return <Text style={[styles.text, {marginTop}]} >{text}</Text>
};

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: '600',
        color: COLOR_ROOT.BLACK
    }
});

export default Title;