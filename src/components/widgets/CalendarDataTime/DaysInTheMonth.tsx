import React, { FC, useMemo, useContext } from 'react';
import VibrationApp from '@/helpers/helpersForComponents/vibration/VibrationApp';
import Days from './Days';
import contexSelectedDays from './helper/contexSelectedDays';

import type { TSelect } from './Calendar';

interface IDaysInTheMonth {
    widthMonth: number;
    day: string;
    select: TSelect;
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}


/**
 * @component `Дни в месяце.`
 */
const DaysInTheMonth: FC<IDaysInTheMonth> = ({
    widthMonth,
    day,
    select,
    setIsShow
}) => {

    const context = useContext(contexSelectedDays);

    //* memoDaysInTheMonth
    const memoDaysInTheMonth = useMemo(() => {
        const handlePressDay = (item: string | null): void => {
            if(!item) return;
            VibrationApp.select();
    
            if(select === 'one') {
                context.setSelectedDays([item]);
                setTimeout(() => setIsShow(false), 300);
            }
            if(select === 'multi') {
                if(context.selectedDays.includes(item)) {
                    context.setSelectedDays(state => state.filter(value => value !== item));
                } else {
                    context.setSelectedDays(state => ([...state, item]));
                }
            }
        };

        return (
            <Days
                day={day}
                selectedDays={context.selectedDays}
                handlePressDay={handlePressDay}
            />
        );

    }, [day, context.selectedDays, widthMonth]);
    

    return memoDaysInTheMonth;
};



export default DaysInTheMonth;



