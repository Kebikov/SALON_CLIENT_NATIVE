import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';


/**
 * @shared Блок с двумя линиями и "или".
 */
const LinesWithOr: FC = () => {

    return (
        <View style={styles.boxLine} >
            <View style={styles.line} />
            <View style={styles.boxOr}>
                <Text style={styles.textOr} >или</Text>
            </View>
            <View style={styles.line} />
        </View>
    );
};


const styles = StyleSheet.create({
    boxLine: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },
    boxOr: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -5
    },
    line: {
        width: '40%',
        height: 1,
        backgroundColor: COLOR_ROOT.MIDDLE_GRAY
    },
    textOr: {
        fontSize: 16,
        fontWeight: '400',
        color: COLOR_ROOT.MIDDLE_GRAY
    }
});


export default LinesWithOr;