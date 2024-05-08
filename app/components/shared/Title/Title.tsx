import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';


interface ITitle {
    text: string;
    marginTop?: number;
    location?: 'center' | 'left';
}


/**
 * @shared `Текст загаловка.`
 * @param text Текст загаловка.
 * @param marginTop ? Отступ с верху.
 * @param location ? Расположение текста, слева или по центру(по умолчанию центр).
 * @example <Title text={#} marginTop={?#} />
 */
const Title: FC<ITitle> = ({text, marginTop = 0, location = 'center'}) => {

    return( 
        <Text style={[styles.text, {marginTop, textAlign: location}]} >
                {text}
        </Text>
    )
};

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: '600',
        color: COLOR_ROOT.BLACK
    }
});

export default Title;