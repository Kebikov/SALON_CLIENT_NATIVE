import { View, Text, StyleSheet, Image, Pressable, Platform } from 'react-native';
import React, { FC, useEffect } from 'react';
import Time from '@/helpers/Time/Time';


interface ICalendarHeader {
    currentDay: string;
    setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
}


/**
 * @component `Шапка в календаре.`
 * @param currentDay обьект interface IcurrentDay.
 * @param setCurrentDay Установка текушей даты.
 */
const CalendarHeader: FC<ICalendarHeader> = ({
    currentDay,
    setCurrentDay
}) => {
    
    /**
     * `Добавить/отнять месяц.`
     */
    const setMonth = (sign: 'plus' | 'minus') => {
        setCurrentDay(state => {
            const splitDate = Time.splitDate(state);
            const date = new Date(splitDate.year, splitDate.month - 1, 1, 14, 0, 0, 0);
            date.setMonth(sign === 'plus' ? date.getMonth() + 1 : sign === 'minus' ? date.getMonth() - 1 : 0);
            return Time.dateToOnlyDataString(date);
        });
    }

    const splitDate = Time.splitDate(currentDay);

    return (
        <View style={styles.container} >
            <View style={styles.dataBox} >
                <Text style={styles.textData}>{`${Time.getMonthString('full', splitDate.month)} ${splitDate.year}`}</Text>
            </View>
            <View style={styles.arrowsBox} >
                <Pressable
                    style={styles.arrowLeft}
                    onPress={() => setMonth('minus')}
                >
                    <Image style={[styles.img, {transform: [{translateX: -10}]}]} source={require('@/source/img/icon-menu/arrow-blue.png')} />
                </Pressable>
                <Pressable
                    style={styles.arrowRight}
                    onPress={() => setMonth('plus')}
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