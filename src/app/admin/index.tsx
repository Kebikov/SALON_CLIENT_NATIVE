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


import BottomModalSheet from '@/components/wrappers/BottomModalSheet/BottomModalSheet';
import type  { IRefBottomModalSheet } from '@/components/wrappers/BottomModalSheet/types';


/** 
 * @page Главная страница Admin приложения после регистрации.
 */
const HomeAdmin: FC = () => {

    /**
     * @param selectedDays `Массив с выбранными датами.`
     * @example ['2022-02-28', '2022-02-20']
     */
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const refCalendar = useRef<ICalendarRef>(null);

    const {appRouter} = useHookRouter();
    const refModal = useRef<IRefBottomModalSheet>(null);
   

    const press = () => {
        // Открыть календарь.
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
                <Pressable
                    onPress={() => press()}
                >
                    <Text 
                        style={{fontSize: 20, textAlign: 'center', backgroundColor: 'green', marginTop: 20, color: '#fff', paddingVertical: 5}} 
                    >
                        кнопка для теста
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


