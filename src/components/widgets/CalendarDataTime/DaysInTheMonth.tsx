import { View, StyleSheet, NativeSyntheticEvent, NativeScrollEvent, useWindowDimensions, LayoutChangeEvent } from 'react-native';
import React, { FC, memo, useMemo } from 'react';
import VibrationApp from '@/helpers/helpersForComponents/vibration/VibrationApp';
import Days from './Days';

import type { TSelect } from './Calendar';

interface IDaysInTheMonth {
    widthMonth: number;
    day: string;
    selectedDays: string[];
    select: TSelect;
    setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>;
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}


/**
 * @component `Дни в месяце.`
 */
const DaysInTheMonth: FC<IDaysInTheMonth> = ({
    widthMonth,
    day,
    selectedDays,
    select,
    setSelectedDays,
    setIsShow
}) => {

    const totalColum = 7;
    const sizeSide = Number((widthMonth / totalColum));

    //* memoDaysInTheMonth
    const memoDaysInTheMonth = useMemo(() => {
        const handlePressDay = (item: string | null): void => {
            if(!item) return;
            VibrationApp.select();
    
            if(select === 'one') {
                setSelectedDays([item]);
                setTimeout(() => setIsShow(false), 300);
            }
            if(select === 'multi') {
                if(selectedDays.includes(item)) {
                    setSelectedDays(state => state.filter(item => item !== item));
                } else {
                    setSelectedDays(state => ([...state, item]));
                }
            }
        };

        return (
            <Days
                day={day}
                selectedDays={selectedDays}
                sizeSide={sizeSide}
                handlePressDay={handlePressDay}
            />
        );

    }, [day, selectedDays, widthMonth]);
    

    return memoDaysInTheMonth;
};



export default DaysInTheMonth;