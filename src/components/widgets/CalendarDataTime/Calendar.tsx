import { View, Text, StyleSheet, Platform, Pressable, useWindowDimensions } from 'react-native';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import CalendarHeader from './CalendarHeader';
import WeekDays from './WeekDays';
import Month from './Month';
import Time from '@/helpers/Time/Time';
import { BlurView } from 'expo-blur';
import { Portal } from '@gorhom/portal';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import VibrationApp from '@/helpers/helpersForComponents/vibration/VibrationApp';
import contexSelectedDays from './helper/contexSelectedDays';

const {Provider} = contexSelectedDays;

export type TSelect = 'multi' | 'one';

export interface ICalendarRef {
    /**
     * `Открыть календарь.`
     */
    openCalendar: () => void;
}

interface ICalendar {
    selectedDays: string[];
    setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>;
    select?: TSelect;
}

/**
 * @widgets `Календарь.`
 * @param selectedDays `Массив с выбранными датами.`
 * @param setSelectedDays Установка selectedDays.
 * @param select ? Множественный выбор дат или нет.
 */
const Calendar = forwardRef<ICalendarRef, ICalendar>(({
    selectedDays,
    setSelectedDays,
    select = 'one'
}, ref) => {
    const {width} = useWindowDimensions();
    const widthCalendar = Math.round(width * 80 / 100);

    /**
     * @param currentDay `Текушяя дата с которой работаем.`
     * @example '2022-02-28'
     */
    const [currentDay, setCurrentDay] = useState<string>(Time.getCurrentMonth());
    /**
     * @param isShow Показать/скрыть календарь.
     */
    const [isShow, setIsShow] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        openCalendar: () => setIsShow(true)
    }));


    return (
        <Portal name='calendar' >
            <Provider value={{selectedDays, setSelectedDays}} >
                {
                    isShow
                    ?
                    <Animated.View
                        style={styles.main}
                        entering={FadeIn.duration(500)} 
                        exiting={FadeOut.duration(500)} 
                    >
                        <BlurView
                            style={[styles.container]} 
                            intensity={30}
                            tint='dark'
                        >
                            <View style={[styles.blur, {width: widthCalendar}]} >
                                <View style={[styles.body, {marginTop: 15, marginBottom: select === 'one' ? 15 : 0}]} >
                                    <CalendarHeader 
                                        currentDay={currentDay}
                                    />
                                    <WeekDays/>
                                    <Month 
                                        currentDay={currentDay} 
                                        setCurrentDay={setCurrentDay} 
                                        setIsShow={setIsShow}
                                        select={select}
                                    />
                                </View>
                                {
                                    select === 'multi'
                                    ?
                                    <Pressable 
                                        style={styles.bodyOk}
                                        onPress={() => {
                                            VibrationApp.pressButton();
                                            setIsShow(false);
                                            setCurrentDay(Time.getCurrentMonth());
                                        }}
                                    >
                                        <Text style={styles.textOk}>OK</Text>
                                    </Pressable>
                                    :
                                    null
                                }
                            </View>
                        </BlurView>
                    </Animated.View>
                    :
                    null
                }
            </Provider>
        </Portal>
    );
});


const styles = StyleSheet.create({
    main: {
        position: 'absolute',
        zIndex: 10,
        width: '100%',
        height: '100%'
    },
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, .2)' : 'rgba(255, 255, 255, .5)'
    },
    blur: {
        backgroundColor: COLOR_ROOT.GRAY_DARK,
        borderRadius: 14,
        overflow: 'hidden',
    },
    body: {
        width: '100%'
    },
    bodyOk: {
        marginTop: 10,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.4)'
    },
    textOk: {
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        fontWeight: Platform.OS === 'ios' ? '400' : '400',
        color: 'white',
        textAlign: 'center'
    }
});

export default Calendar;

