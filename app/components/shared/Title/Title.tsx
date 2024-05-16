import { View, Text, StyleSheet, Platform } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';


interface ITitle {
    text: string;
    marginTop?: number;
    location?: 'center' | 'left';
    fontSize?: number;
}


/**
 * @shared `Title.`
 * @param text Text title.
 * @param marginTop ? Margin top.
 * @param location ? Text location, 'left' or 'center' (default center).
 * @param fontSize ? Header size (default 18)
 * @example <Title text={#} marginTop={?#} location={?#} fontSize={?#} />
 */
const Title: FC<ITitle> = ({text, marginTop = 0, location = 'center', fontSize = 18}) => {

    return( 
        <Text style={[styles.text, {marginTop, fontSize: Platform.OS === 'ios' ? fontSize + 2 : fontSize, textAlign: location}]} >
                {text}
        </Text>
    )
};

const styles = StyleSheet.create({
    text: {
        fontWeight: '600',
        color: COLOR_ROOT.BLACK
    }
});

export default Title;