import { Text, StyleSheet, Pressable } from 'react-native';
import React, { FC, useRef, useState } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import WrapperScroll from '@/components/wrappers/WrapperScroll/WrapperScroll';
import HomeUserHeader from '@/components/widgets/HomeUserHeader/HomeUserHeader';
import ListDepartment from '@/components/widgets/ListDepartment/ListDepartment';
import ListMasters from '@/components/widgets/ListMasters/ListMasters';
import ListService from '@/components/widgets/ListService/ListService';
import { useHookRouter } from '@/helpers/router/useHookRouter';
import { Portal } from '@gorhom/portal';
import Calendar from '@/components/widgets/CalendarDataTime/Calendar';
import { ICalendarRef } from '@/components/widgets/CalendarDataTime/Calendar';
import Time from '@/helpers/Time/Time';
import Clock from '@/components/widgets/Clock/Clock';

import { IClockRef } from '@/components/widgets/Clock/Clock';


import BottomModalSheet from '@/components/wrappers/BottomModalSheet/BottomModalSheet';
import type  { IRefBottomModalSheet } from '@/components/wrappers/BottomModalSheet/types';
import type { ITimeClock } from '@/components/widgets/Clock/Clock';


/** 
 * @page Главная страница Admin приложения после регистрации.
 */
const HomeAdmin: FC = () => {


    const {appRouter} = useHookRouter();
    const refModal = useRef<IRefBottomModalSheet>(null);

    const refClock = useRef<IClockRef>(null);

    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const refCalendar = useRef<ICalendarRef>(null);

    /**
     * @param 
     */
    const [selectedTime, setSelectedTime] = useState<ITimeClock>({hour: '14', minute: '15'});

    const press = () => {
        console.log('press');
        //refClock.current?.openClock();
        refCalendar.current?.openCalendar();
    }

    return (
        <>
            <WrapperScroll>
                <HomeUserHeader/>
                <Calendar 
                    selectedDays={selectedDays}
                    setSelectedDays={setSelectedDays}
                    select='multi'
                    ref={refCalendar} 
                />
                <Clock setSelectedTime={setSelectedTime} selectedTime={selectedTime} ref={refClock} />
                <Pressable
                    onPress={() => press()}
                >
                    <Text 
                        style={{fontSize: 20, textAlign: 'center', backgroundColor: 'green', marginTop: 20, color: '#fff', paddingVertical: 5}} 
                    >
                        {`кнопка для теста ${selectedTime.hour}:${selectedTime.minute}`}
                    </Text>
                </Pressable>
                
                <Text style={[styles.text, {marginTop: 10}]} >Service</Text>
                <ListDepartment/>
                <Text style={[styles.text, {marginTop: 10}]} >Masters</Text>
                <ListMasters/>
                <Text style={[styles.text, {marginTop: 0}]} >Популярные услуги</Text>
                <ListService/>

                <BottomModalSheet ref={refModal}>
                    <Text style={{fontSize: 30}}>Home</Text>
                </BottomModalSheet>

            </WrapperScroll>
        </>
    );
};


const styles = StyleSheet.create({
    main: { flex: 1 },
    box: { },
    text: {
        fontSize: 15,
        color: COLOR_ROOT.ORANGE,
        fontWeight: '500',
        marginLeft: 10
    }
});


export default HomeAdmin;


