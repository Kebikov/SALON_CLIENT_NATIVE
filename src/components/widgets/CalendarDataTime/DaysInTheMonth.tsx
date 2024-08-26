import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import React, { FC, useCallback, memo } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import Time from '@/helpers/Time/Time';
import VibrationApp from '@/helpers/helpersForComponents/vibration/VibrationApp';

import type { TSelect } from './Calendar';


interface IDaysInTheMonth {
    widthCalendar: number;
    day: string;
    selectedDays: string[];
    select: TSelect;
    setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>;
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}


/**
 * @component
 * @example 
 * @returns {JSX.Element}
 */
const DaysInTheMonth: FC<IDaysInTheMonth> = memo(({
    widthCalendar,
    day,
    selectedDays,
    select,
    setSelectedDays,
    setIsShow
}) => {
    
    const totalColum = 7;
    const sizeSide = Number((widthCalendar / totalColum).toFixed(3)) - .001;
    const allDays = Time.getArrayForMonth(day);
    const splitCurrentDay = Time.splitDate(day);

    const nowDay = Time.getCurrentDay();

    const handlePressDay = useCallback((item: string | null): void => {
        if(!item) return;
        const splitCurrentDay = Time.splitDate(item);
        VibrationApp.select();
        const date = Time.combineForDate({year: splitCurrentDay.year, month: splitCurrentDay.month, day: splitCurrentDay.day});
        if(select === 'one') {
            setSelectedDays([date]);
            setTimeout(() => setIsShow(false), 300);
        }
        if(select === 'multi') {
            if(selectedDays.includes(date)) {
                setSelectedDays(state => state.filter(item => item !== date));
            } else {
                setSelectedDays(state => ([...state, date]));
            }
        }
    }, [day]);

    return (
        <View style={[styles.body]} >
            {
                allDays.map((item, i) => {
                    const itemDay = item ? Time.combineForDate({year: splitCurrentDay.year, month: splitCurrentDay.month, day: item}) : null;
                    // Если текуший день и он выбран.
                    if(itemDay && itemDay === nowDay && selectedDays.includes(itemDay)) {
                        return (
                            <Pressable style={[styles.itemGrid, {width: sizeSide, height: sizeSide}]} onPress={() => handlePressDay(itemDay)} key={i} >
                                <View style={[styles.item, styles.round, styles.border, styles.checkItem]}>
                                    <Text style={[styles.dayText]} >{item}</Text>
                                </View>
                            </Pressable>
                        )
                    } 
                    // Если текуший день.
                    else if(itemDay && itemDay === nowDay) {
                        return (
                            <Pressable style={[styles.itemGrid, {width: sizeSide, height: sizeSide}]} onPress={() => handlePressDay(itemDay)} key={i} >
                                <View style={[styles.item, styles.round, styles.border]} >
                                    <Text style={[styles.dayText]} >{item}</Text>
                                </View>
                            </Pressable>
                        )
                    } 
                    // Если день выбран.
                    else if(itemDay && selectedDays.includes(itemDay)) {
                        return (
                            <Pressable style={[styles.itemGrid, {width: sizeSide, height: sizeSide}]} onPress={() => handlePressDay(itemDay)} key={i} >
                                <View style={[styles.item, styles.round, styles.checkItem]} >
                                    <Text style={[styles.dayText]} >{item}</Text>
                                </View>
                            </Pressable>
                        )
                    }
                    // Остальные дни.
                    else {
                        return (
                            <Pressable style={[styles.itemGrid, {width: sizeSide, height: sizeSide}]} onPress={() => handlePressDay(itemDay)} key={i} >
                                <View style={[styles.item]}>
                                    <Text style={[styles.dayText]} >{item}</Text>
                                </View>
                            </Pressable>
                        )
                    }
                })
            }
        </View>
    );
});

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },
    itemGrid: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4
    },
    item: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    round: {
        borderRadius: 150,
        overflow: 'hidden',
    },
    
    border: {
        borderWidth: 1,
        borderColor: 'white'
    },
    dayText: {
        fontSize: Platform.OS === 'ios' ? 15 : 13,
        fontWeight: '500',
        color: 'white',
        textAlign:'center'
    },
    checkItem: {
        backgroundColor: COLOR_ROOT.BLUE, 
    },
});

export default DaysInTheMonth;