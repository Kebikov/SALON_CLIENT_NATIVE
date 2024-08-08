import { View, Text, StyleSheet, Image, Pressable, Platform } from 'react-native';
import React, { FC } from 'react';
import Time from '@/helpers/Time/Time';

import type { IcurrentDay } from './Calendar';


interface ICalendarHeader {
    date: IcurrentDay;
    setCurrentDay: React.Dispatch<React.SetStateAction<IcurrentDay>>;
}


/**
 * @component `Шапка в календаре.`
 * @param date обьект interface IcurrentDay.
 * @param setCurrentDay Установка текушей даты.
 */
const CalendarHeader: FC<ICalendarHeader> = ({
    date,
    setCurrentDay
}) => {
    
    const setMonth = (sign: 'plus' | 'minus') => {
        setCurrentDay(currentDay => {
            const date = new Date(currentDay.year, currentDay.month, currentDay.day, 14, 0, 0, 0);
            date.setMonth(sign === 'plus' ? date.getMonth() + 1 : sign === 'minus' ? date.getMonth() - 1 : 0);
            return Time.getIcurrentDay(date);
        });
    }


    return (
        <View style={styles.container} >
            <View style={styles.dataBox} >
                <Text style={styles.textData}>{`${Time.getMonthString('full',date.month)} ${date.year}`}</Text>
            </View>
            <View style={styles.arrowsBox} >
                <Pressable
                    style={styles.arrowLeft}
                    onPress={() => setMonth('minus')}
                >
                    <Image style={[styles.img, {transform: [{translateX: -10}]}]} source={require('@/source/img/icon-menu/arrow-white.png')} />
                </Pressable>
                <Pressable
                    style={styles.arrowRight}
                    onPress={() => setMonth('plus')}
                >
                    <Image style={[styles.img, {transform: [{rotate: '180deg'}, {translateX: -10}]}]} source={require('@/source/img/icon-menu/arrow-white.png')} />
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
        fontSize: 15,
        fontWeight: '500'
    },
    arrowsBox: {
        flexDirection: 'row'
    },
    arrowLeft: {
        width: 50,
        height: 22,
        //backgroundColor: 'red',
        paddingVertical: 2
    },
    arrowRight: {
        width: 50,
        height: 22,
        paddingVertical: 2,
        //backgroundColor: 'green'
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    }
});

export default CalendarHeader;