import { View, Text, StyleSheet, Image, Pressable, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React, { FC, useEffect } from 'react';
import Time from '@/helpers/Time/Time';
import VibrationApp from '@/helpers/helpersForComponents/vibration/VibrationApp';

import type { IRefMonthDays } from './MonthDays';


interface ICalendarHeader {
    currentDay: string;
    refMonthDays: React.RefObject<IRefMonthDays>
}


/**
 * @component `Шапка в календаре.`
 * @param currentDay обьект interface IcurrentDay.
 * @param refMonthDays Ref управления FlatLIst у дней календаря.
 */
const CalendarHeader: FC<ICalendarHeader> = ({
    currentDay,
    refMonthDays
}) => {

    const splitDate = Time.splitDate(currentDay);

    return (
        <View style={styles.container} >
            <View style={styles.dataBox} >
                <Text style={styles.textData}>{`${Time.getMonthString('full', splitDate.month)} ${splitDate.year}`}</Text>
            </View>
            <View style={styles.arrowsBox} >
                <Pressable
                    style={styles.arrowLeft}
                    onPress={() => {
                        VibrationApp.select();
                        refMonthDays.current?.previousMonth();
                    }}
                >
                    <Image style={[styles.img, {transform: [{translateX: -10}]}]} source={require('@/source/img/icon-menu/arrow-blue.png')} />
                </Pressable>
                <Pressable
                    style={styles.arrowRight}
                    onPress={() => {
                        VibrationApp.select();
                        refMonthDays.current?.nextMonth();
                    }}
                >
                    <Image style={[styles.img, {transform: [{rotate: '180deg'}, {translateX: -10}]}]} source={require('@/source/img/icon-menu/arrow-blue.png')} />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dataBox: {

    },
    textData: {
        paddingLeft: 5,
        color: 'white',
        fontSize: Platform.OS === 'ios' ? 17 : 15,
        fontWeight: '500'
    },
    arrowsBox: {
        flexDirection: 'row'
    },
    arrowLeft: {
        width: 50,
        height: 25,
        paddingVertical: 2
    },
    arrowRight: {
        width: 50,
        height: 25,
        paddingVertical: 2,
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    }
});

export default CalendarHeader;