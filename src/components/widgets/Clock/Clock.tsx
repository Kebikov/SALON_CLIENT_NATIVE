import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { FC, useState } from 'react';
import { Portal } from '@gorhom/portal'; 
import { COLOR_ROOT } from '@/data/colors';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, interpolate, runOnJS, withTiming } from 'react-native-reanimated';
import VibrationApp from '@/helpers/helpersForComponents/vibration/VibrationApp';


interface IClock {
    selectedTime:  ITimeClock;
    setSelectedTime: React.Dispatch<React.SetStateAction<ITimeClock>>
}

export interface ITimeClock {
    hour: string;
    minute: string;
}

/**
 * @widgets `Установка времени.`
 * @param selectedTime Обьект с выбранным временем.
 * @param setSelectedTime Установка выбранного времени.
 */
const Clock: FC<IClock> = ({
    selectedTime,
    setSelectedTime
}) => {
    /**
     * `Позиция часа.`
     */
    const hoursPosition = useSharedValue<number>(0);
    /**
     * `Последняя позиция часа.`
     */
    const lastHoursPosition = useSharedValue<number>(0);
    /**
     * `Позиция минут.`
     */
    const minutesPosition = useSharedValue<number>(0);
    /**
     * `Последняя позиция минут.`
     */
    const lastMinutesPosition = useSharedValue<number>(0);
    /**
     * `Выбраный пользователем час.`
     */
    const selectedHour = useSharedValue<string>(selectedTime.hour);
    /**
     * `Выбраные пользователем минуты.`
     */
    const selectedMinute = useSharedValue<string>(selectedTime.minute);
    /**
     * `Массив часов.`
     */
    const hoursArray = ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
    /**
     * `Массив минут.`
     */
    const minutesArray = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

    /**
     * `Высота окна с цыфрами.`
     */
    const height = 252;
    /**
     * `Количество элементов в окне.`
     */
    const totalElements = 7;
    /**
     * `Высота одного элемента.`
     */
    const itemHeight = height / totalElements; 
    /**
     * `Диаметр полного оборота часов.`
     */
    const fullRotation = hoursArray.length * height / 7; 
    /**
     * `Диаметр полного оборота минут.`
     */
    const fullRotationMinutes = minutesArray.length * height / 7;
    /**
     * `Массив промежутков для часов.`
     */
    const gaps: number[] = [];
    for(let i = 0; i <= fullRotation; i += itemHeight) gaps.push(i);
    for(let i = 0; i <= fullRotation; i += itemHeight) {
        if(i == fullRotation) continue;
        gaps.push(i === 0 ? 0 : i * -1);
    }
    gaps.push(fullRotation * -1);
    /**
     * `Массив промежутков для минут.`
     */
    const gapsMinutes: number[] = [];
    for(let i = 0; i <= fullRotationMinutes; i += itemHeight) gapsMinutes.push(i);
    for(let i = 0; i <= fullRotationMinutes; i += itemHeight) {
        if(i == fullRotationMinutes) continue;
        gapsMinutes.push(i === 0 ? 0 : i * -1);
    }
    gapsMinutes.push(fullRotationMinutes * -1);

    /**
     * `Установка выбраного времени.`
     */
    const setTime = () => {
        setSelectedTime({hour: selectedHour.value, minute: selectedMinute.value});
    }

    const gesturePanHours = Gesture.Pan()
        .onUpdate((e) => {
            hoursPosition.value = (lastHoursPosition.value + e.translationY) % fullRotation;
        })
        .onEnd(() => {
            let point: undefined | {value: number, i: number};
            const position = hoursPosition.value === fullRotation * -1 ? 0 : hoursPosition.value;
            for(let i = 0; i < gaps.length; i++) {
                if(0 <= position) {
                    if(gaps[i] < position && position < gaps[i + 1]) {
                        point = Math.abs( Math.abs(gaps[i]) - Math.abs(position) ) <= itemHeight/2 ? {value: gaps[i], i} : {value: gaps[i + 1], i: i + 1};
                        if(0 <= point.i && point.i < 4) {
                            let x = 3 - point.i;
                            selectedHour.value = hoursArray[x];
                            console.log('hour =', selectedHour.value);
                        } else {
                            let x = hoursArray.length + 3 - point.i;
                            selectedHour.value = hoursArray[x];
                            console.log('hour =', selectedHour.value);
                        }
                    }
                } else {
                    if(gaps[i] > position && position > gaps[i + 1]) {
                        point = Math.abs( Math.abs(gaps[i]) - Math.abs(position) ) <= itemHeight/2 ? {value: gaps[i], i} : {value: gaps[i + 1], i: i + 1};
                        if(46 <= point.i && point.i <= 48) {
                            let x = point.i - 46;
                            selectedHour.value = hoursArray[x];
                            console.log('hour =', selectedHour.value);
                        } else {
                            let x = point.i - 22;
                            selectedHour.value = hoursArray[x];
                            console.log('hour =', selectedHour.value);
                        }
                    }
                }
            }
            if(point !== undefined) {
                hoursPosition.value = withTiming(point.value, {duration: 200});
                lastHoursPosition.value = point.value;
            } else {
                lastHoursPosition.value = hoursPosition.value;
            }
        });

    const gesturePanMinutes = Gesture.Pan()
        .onUpdate((e) => {
            minutesPosition.value = (lastMinutesPosition.value + e.translationY) % fullRotationMinutes;
        })
        .onEnd(() => {
            let point: undefined | {value: number, i: number};

            const position = minutesPosition.value === fullRotationMinutes * -1 ? 0 : minutesPosition.value;
            console.log('position = ', position);
            for(let i = 0; i < gapsMinutes.length; i++) {
                if(0 <= position) {
                    if(gapsMinutes[i] < position && position < gapsMinutes[i + 1]) {
                        point = Math.abs( Math.abs(gapsMinutes[i]) - Math.abs(position) ) <= itemHeight/2 ? {value: gapsMinutes[i], i} : {value: gapsMinutes[i + 1], i: i + 1};
                        //:                    
                        console.log('+point.i = ', point.i);
                        if(1 <= point.i && point.i <= 3) {
                            let x = 3 - point.i;
                            selectedMinute.value = minutesArray[x];
                            console.log('minutes = ', selectedMinute.value);
                        } else {
                            let x = minutesArray.length + 3 - point.i;
                            
                            selectedMinute.value = minutesArray[x];
                            console.log('minutes = ', selectedMinute.value);
                        }
                    }
                } else {
                    if(gapsMinutes[i] > position && position > gapsMinutes[i + 1]) {
                        point = Math.abs( Math.abs(gapsMinutes[i]) - Math.abs(position) ) <= itemHeight/2 ? {value: gapsMinutes[i], i} : {value: gapsMinutes[i + 1], i: i + 1};
                        console.log('-point.i = ', point.i);
                        if(22 <= point.i && point.i <= 24) {
                            let x = point.i - 22;
                            selectedMinute.value = minutesArray[x];
                            console.log('minutes = ', selectedMinute.value);
                        } else {
                            let x = point.i - 10;
                            selectedMinute.value = minutesArray[x];
                            console.log('minutes = ', selectedMinute.value);
                        }
                    }
                }
            }
            //console.log('Point = ', point);
            if(point !== undefined) {
                minutesPosition.value = withTiming(point.value, {duration: 200});
                lastMinutesPosition.value = point.value;
            } else {
                lastMinutesPosition.value = minutesPosition.value;
            }

            //console.log(lastMinutesPosition.value);
        });

    const animatedHours = (i: number) => {
        return useAnimatedStyle(() => {

            const elementPositionBefore = hoursPosition.value + i * itemHeight;
            let iAfter = i;

            if(elementPositionBefore > fullRotation / 2) {
                iAfter = (24 - i) * -1;
            }

            let elementPositionAfter = hoursPosition.value + iAfter * itemHeight;

            if(elementPositionAfter < (fullRotation - height + itemHeight) * -1) {
                iAfter = 24 + i;
                elementPositionAfter = hoursPosition.value + iAfter * itemHeight;
            }

            const inboundData = [0, itemHeight * 3, itemHeight * 6];

            return{
                top: elementPositionAfter,
                transform: [
                    {
                        rotateX: `${interpolate(elementPositionAfter, inboundData, [90, 0, 90])}deg`
                    }, 
                    {
                        scale: interpolate(elementPositionAfter, inboundData, [.5, 1, .5])
                    }
                ],
                opacity: interpolate(elementPositionAfter, inboundData, [.1, 1, .1])
            }
        })
    }

    const animatedMinutes = (i: number) => {
        return useAnimatedStyle(() => {

            const elementPositionBefore = minutesPosition.value + i * itemHeight;
            let iAfter = i;
            //console.log(`i-(${i}) = `, i);

            if(elementPositionBefore > fullRotationMinutes / 2) { // 216
                iAfter = (12 - i) * -1;
            }
            //console.log(`iAfter-(${iAfter}) = `, iAfter);

            let elementPositionAfter = minutesPosition.value + iAfter * itemHeight; 

            if(elementPositionAfter < (fullRotationMinutes - height + itemHeight) * -1) {
                iAfter = 12 + i;
                elementPositionAfter = minutesPosition.value + iAfter * itemHeight;
            }

            const inboundData = [0, itemHeight * 3, itemHeight * 6];

            //console.log(elementPositionAfter);
            return{
                top: elementPositionAfter,
                transform: [
                    {
                        rotateX: `${interpolate(elementPositionAfter, inboundData, [90, 0, 90])}deg`
                    }, 
                    {
                        scale: interpolate(elementPositionAfter, inboundData, [.5, 1, .5])
                    }
                ],
                opacity: interpolate(elementPositionAfter, inboundData, [.1, 1, .1])
            }
        })
    }

    const hours = hoursArray.map((item, i) => {
            return(
                <Animated.View style={[styles.timeBox, {height: itemHeight}, animatedHours(Number(i))]} key={i} >
                    <Text style={styles.timeText} >{item}</Text>
                </Animated.View>
            )
    });

    const minutes = minutesArray.map((item, i) => {
        return(
            <Animated.View style={[styles.timeBox, {height: itemHeight}, animatedMinutes(Number(i))]} key={i} >
                <Text style={styles.timeText} >{item}</Text>
            </Animated.View>
        )
    });

    return (
        <Portal name='clock' >
            <View style={styles.container} >
                <View style={styles.body} >
                    <View style={[styles.time, {height}]} >
                        <View style={styles.line}>
                            <View style={styles.lineBody} ></View>
                        </View>
                        <GestureDetector gesture={gesturePanHours} >
                            <View style={styles.block} >
                                {hours}
                            </View>
                        </GestureDetector>

                        <View>
                            <Text style={{color: 'white', fontSize: 23}} >:</Text>
                        </View>

                        <GestureDetector gesture={gesturePanMinutes} >
                            <View style={styles.block} >
                                {minutes}
                            </View>
                        </GestureDetector>

                    </View>
                </View>
                <Pressable 
                    style={styles.button}
                    onPress={() => setTime()}
                >
                    <Text style={styles.buttonText} >OK</Text>
                </Pressable>
            </View>
        </Portal>
    );
};

const radiusClock = 14;
const widthClock = '60%';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'pink'
    },
    body: {
        width: widthClock,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: radiusClock,
        borderTopRightRadius: radiusClock,
        backgroundColor: COLOR_ROOT.GRAY_DARK,
    },
    time: {
        position: 'relative',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
        overflow: 'hidden'
    },
    block: {
        position: 'relative',
        zIndex: 2,
        width: 40,
        height: '100%',
        overflow: 'hidden'
    },

    timeBox: {
        position: 'absolute',
        left: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'red',
    },
    timeText: {
        color: 'white',
        fontSize: 23,
        textAlign: 'center',
        //backgroundColor: 'pink'
    },
    button: {
        width: '60%',
        height: 50,
        borderBottomLeftRadius: radiusClock,
        borderBottomRightRadius: radiusClock,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, .3)',
        backgroundColor: COLOR_ROOT.GRAY_DARK,
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    line: {
        position: 'absolute',
        zIndex: 1,
        top: 106,
        left: 0,
        width: '100%',
        height: 40,
    },
    lineBody: {
        flex: 1,
        backgroundColor: 'white',
        opacity: .15
    }
});

export default Clock;