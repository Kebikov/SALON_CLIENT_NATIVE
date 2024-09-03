import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import Time from '@/helpers/Time/Time';
import Day from './Day';

interface IDays {
    day: string;
    selectedDays: string[];
    handlePressDay: (item: string | null) => void;
}

/**
 * @component 'Все дни в месяце.'
 */
const Days: FC<IDays> = ({
    day,
    selectedDays,
    handlePressDay
}) => {
    const allDays = Time.getArrayForMonth(day);
    const splitCurrentDay = Time.splitDate(day);
    const nowDay = Time.getCurrentDay();
    
    return (
        <View style={[styles.body]} >
            {  
                allDays.map((item, i) => {
                    const itemDay = item ? Time.combineForDate({year: splitCurrentDay.year, month: splitCurrentDay.month - 1, day: item}) : null;
                    //* Если текуший день и он выбран.
                    if(itemDay && itemDay === nowDay && selectedDays.includes(itemDay)) {
                        return (
                            <Day
                                handlePressDay={handlePressDay}
                                itemDay={itemDay}
                                item={item}
                                styleDay='current & selected'
                                key={i}
                            />
                        )
                    } 
                    //* Если текуший день.
                    else if(itemDay && itemDay === nowDay) {
                        return (
                            <Day
                                handlePressDay={handlePressDay}
                                itemDay={itemDay}
                                item={item}
                                styleDay='current'
                                key={i}
                            />
                        )
                    } 
                    //* Если день выбран.
                    else if(itemDay && selectedDays.includes(itemDay)) {
                        return (
                            <Day
                                handlePressDay={handlePressDay}
                                itemDay={itemDay}
                                item={item}
                                styleDay='selected'
                                key={i}
                            />
                        )
                    }
                    //* Остальные дни.
                    else if(itemDay || itemDay === null) {
                        return (
                            <Day
                                handlePressDay={handlePressDay}
                                itemDay={itemDay}
                                item={item}
                                styleDay='just a day'
                                key={i}
                            />
                        )
                    }
                })
            }
        </View>
    );
};


const styles = StyleSheet.create({
    body: {
        //position: 'relative',
        //backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    }
});


export default Days;