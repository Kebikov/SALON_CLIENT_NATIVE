import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import Time from '@/helpers/Time/Time';

import type { IcurrentDay } from './Calendar';


interface IMonthDays {
    date: IcurrentDay;
}


/**
 * @component `Дни месяца.`
 * @param date Год и месяц.
 */
const MonthDays: FC<IMonthDays> = ({
    date
}) => {
    
    const allDays = Time.getArrayForMonth(date);
    const nowDay = Time.getIcurrentDay(null);
    
    return (
        <View style={styles.container} >
            <View style={styles.body} >
                {
                    allDays.map((item, i) => (
                        nowDay.day === item && nowDay.month === date.month && nowDay.year === date.year
                        ?
                        <View style={[styles.itemGrid, styles.roundGrid]} key={i} >
                            <Text style={[styles.day, styles.round]} >{item}</Text>
                        </View>
                        :
                        <View style={styles.itemGrid} key={i} >
                            <Text style={[styles.day, {color: 'white'}]} >{item}</Text>
                        </View>
                    ))
                }
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },
    itemGrid: {
        aspectRatio: 1 / 1,
        width: `${100 / 7}%`,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    day: {
        aspectRatio: 1 / 1,
        width: '100%',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white'
    },
    round: {
        borderRadius: 150,
        borderWidth: 1,
        borderColor: 'white',
    },
    roundGrid: {
        padding: 3
    }
});


export default MonthDays;