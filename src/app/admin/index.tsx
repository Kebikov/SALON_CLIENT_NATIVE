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

import Clock, { ITimeClock, IClockRef } from '@/components/widgets/Clock/Clock';

//import { Clock, IClockRef, ITimeClock} from 'react-native-modal-clock';


import BottomModalSheet from '@/components/wrappers/BottomModalSheet/BottomModalSheet';
import type  { IRefBottomModalSheet } from '@/components/wrappers/BottomModalSheet/types';



/** 
 * @page Главная страница Admin приложения после регистрации.
 */
const HomeAdmin: FC = () => {
    console.info('PAGE_admin/index');
    const {appRouter} = useHookRouter();
    const refModal = useRef<IRefBottomModalSheet>(null);

    const refClock = useRef<IClockRef>(null);

    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    console.log('index = ', selectedDays);
    const refCalendar = useRef<ICalendarRef>(null);

    /**
     * @param electedTime Выбранное время.
     */
    const [selectedTime, setSelectedTime] = useState<ITimeClock>({hour: '14', minute: '15'});

    const press = () => {
        console.log('PRESS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        //appRouter.navigate('/test');
        //refClock.current?.openClock();
        refCalendar.current?.openCalendar();
    }

    return (
        <>
            <WrapperScroll>
                <HomeUserHeader/>
                <Clock 
                    setSelectedTime={setSelectedTime} 
                    selectedTime={selectedTime} 
                    colorBody='#241d3f'
                    colorButton='#241d3f'
                    colorLine='#e2e0de'
                    colorText='#ffce6c'
                    ref={refClock} 
                />
                <Calendar 
                    selectedDays={selectedDays}
                    setSelectedDays={setSelectedDays}
                    select='multi'
                    ref={refCalendar}
                />
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


