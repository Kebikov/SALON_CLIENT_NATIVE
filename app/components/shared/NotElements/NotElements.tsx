import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';


interface INotElements {
    /**
     * Текст в элементе.
     */
    title: string;
}

/**
 * @shared Элемент для отображения, если нет данных.
 * @param title Текст в элементе.
 */
const NotElements: FC<INotElements> = ({title}) => {

    return (
        <View style={styles.main}>
            <Text style={styles.text} >{title}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    main: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20
    },
    text: {
        fontSize: 16,
        color: COLOR_ROOT.MAIN_COLOR
    }
});

export default NotElements;