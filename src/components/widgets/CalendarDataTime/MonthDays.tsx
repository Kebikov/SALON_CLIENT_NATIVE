import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import React, { FC } from 'react';
import Time from '@/helpers/Time/Time';
import { COLOR_ROOT } from '@/data/colors';
import VibrationApp from '@/helpers/helpersForComponents/vibration/VibrationApp';

import type { TSelect } from './Calendar';


interface IMonthDays {
    currentDay: string;
    setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
    selectedDays: string[];
    setSelectedDays:  React.Dispatch<React.SetStateAction<string[]>>;
    select: TSelect;
}


/**
 * @component `Дни месяца.`
 * @param currentDay Дата с которой работаем. '2022-02-28'
 * @param setCurrentDay Установка даты с которой работаем.
 * @param selectedDays Выбраные даты, массив.
 * @param setSelectedDays Установка выбранных дат.
 * @param select Множественный выбор дат или нет.
 */
const MonthDays: FC<IMonthDays> = ({
    currentDay,
    setCurrentDay,
    setIsShow,
    selectedDays,
    setSelectedDays,
    select
}) => {
    
    const allDays = Time.getArrayForMonth(currentDay);
    const nowDay = Time.getCurrentDay();

    const splitCurrentDay = Time.splitDate(currentDay);

    const handlePressDay = (item: number | null): void => {
        VibrationApp.select();
        if(!item) return;
        const date = Time.combineForDate({year: splitCurrentDay.year, month: splitCurrentDay.month, day: item});
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
    };

    
    return (
        <View style={styles.container} >
            <View style={styles.body} >
                {
                    allDays.map((item, i) => {
                        const itemDay = item ? Time.combineForDate({year: splitCurrentDay.year, month: splitCurrentDay.month, day: item}) : null;
                        // Если текуший день и он выбран.
                        if(itemDay && itemDay === nowDay && selectedDays.includes(itemDay)) {
                            return (
                                <Pressable style={[styles.itemGrid]} onPress={() => handlePressDay(item)} key={i} >
                                    <View style={[styles.item, styles.round, styles.border, styles.checkItem]}>
                                        <Text style={[styles.dayText]} >{item}</Text>
                                    </View>
                                </Pressable>
                            )
                        } 
                        // Если текуший день.
                        else if(itemDay && itemDay === nowDay) {
                            return (
                                <Pressable style={[styles.itemGrid]} onPress={() => handlePressDay(item)} key={i} >
                                    <View style={[styles.item, styles.round, styles.border]} >
                                        <Text style={[styles.dayText]} >{item}</Text>
                                    </View>
                                </Pressable>
                            )
                        } 
                        // Если день выбран.
                        else if(itemDay && selectedDays.includes(itemDay)) {
                            return (
                                <Pressable style={[styles.itemGrid]} onPress={() => handlePressDay(item)} key={i} >
                                    <View style={[styles.item, styles.round, styles.checkItem]} >
                                        <Text style={[styles.dayText]} >{item}</Text>
                                    </View>
                                </Pressable>
                            )
                        }
                        // Остальные дни.
                        else {
                            return (
                                <Pressable style={[styles.itemGrid]} onPress={() => handlePressDay(item)} key={i} >
                                    <View style={[styles.item]}>
                                        <Text style={[styles.dayText]} >{item}</Text>
                                    </View>
                                </Pressable>
                            )
                        }
                    })
                }
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        marginTop: 5,
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
    dayText: {
        fontSize: Platform.OS === 'ios' ? 15 : 13,
        fontWeight: '500',
        color: 'white',
        textAlign:'center'
    },
    checkItem: {
        backgroundColor: COLOR_ROOT.BLUE, 
    },
    round: {
        borderRadius: 150,
        overflow: 'hidden',
    },
    border: {
        borderWidth: 1,
        borderColor: 'white'
    }
});


export default MonthDays;