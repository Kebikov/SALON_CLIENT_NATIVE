import { View, Text, StyleSheet } from 'react-native';
import React, { FC, useState } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import CalendarHeader from './CalendarHeader';
import WeekDays from './WeekDays';
import MonthDays from './MonthDays';
import Time from '@/helpers/Time/Time';

export interface IcurrentDay {
    day: number;
    month: number;
    year: number;
}


/**
 * @widgets `Календарь.`
 */
const Calendar: FC = () => {

    const [currentDay, setCurrentDay] = useState<IcurrentDay>(Time.getIcurrentDay(null));

    return (
        <View style={styles.container} >
            <View style={styles.body} >
                <CalendarHeader date={currentDay} setCurrentDay={setCurrentDay} />
                <WeekDays/>
                <MonthDays date={currentDay} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        width: '80%',
        backgroundColor: COLOR_ROOT.GRAY_DARK,
        borderRadius: 12,
        padding: '5%'
    }
});

export default Calendar;