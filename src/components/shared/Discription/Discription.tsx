import { View, Text, StyleSheet, Platform } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';


interface IDiscription {
    text: string;
    marginTop?: number;
    fontSize?: number;
}


/**
 * @shared `Текст описание под заглавием.`
 * @param text Текст описания.
 * @param marginTop ? Отступ с верху.
 * @example <Discription text={#} marginTop={?#} />
 */
const Discription: FC<IDiscription> = ({text,marginTop = 0, fontSize = 14}) => {

    return <Text 
                style={[
                    styles.text, 
                    {
                        marginTop, 
                        fontSize: Platform.OS === 'ios' ? fontSize + 2 : fontSize
                    }
                ]} 
            >
                {text}
            </Text>
};

const styles = StyleSheet.create({
    text: {
        color: COLOR_ROOT.MIDDLE_GRAY,
        fontWeight: '400'
    }
});

export default Discription;