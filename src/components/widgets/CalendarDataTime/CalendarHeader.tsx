import { View, Text, StyleSheet, Platform } from 'react-native';
import React, { FC, useRef} from 'react';
import Time from '@/helpers/Time/Time';


interface ICalendarHeader {
    currentDay: string;
}


/**
 * @component `Шапка в календаре.`
 * @param currentDay обьект interface IcurrentDay.
 */
const CalendarHeader: FC<ICalendarHeader> = ({
    currentDay
}) => {
    console.log('currentDay = ', currentDay);
    const splitDate = Time.splitDate(currentDay);

    return (
        <View style={styles.container} >
            <View style={styles.dataBox} >
                <Text style={styles.textData}>{`${Time.getMonthString('full', splitDate.month)} ${splitDate.year}`}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    dataBox: {
        width: '100%',
        alignItems: 'center'
    },
    textData: {
        paddingLeft: 5,
        color: 'white',
        fontSize: Platform.OS === 'ios' ? 17 : 15,
        fontWeight: '500'
    }
});

export default CalendarHeader;