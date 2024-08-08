import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import Time from '@/helpers/Time/Time';

/**
 * @component `Дни недели.`
 */
const WeekDays: FC = () => {

    const week = Time.getNamesOfDaysWeek();

    return (
        <View style={styles.container}>
            {
                week.map((item, i) => (
                    <View style={styles.itemGrid} key={i} >
                        <Text style={styles.day} >{item}</Text>
                    </View>
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 5,
        justifyContent: 'space-around'
    },
    itemGrid: {
        aspectRatio: 1/1,
        width: `${100 / 7}%`,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    day: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
        opacity: .5
    }
});

export default WeekDays;