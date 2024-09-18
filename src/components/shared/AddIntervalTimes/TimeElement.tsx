import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React, { FC, useState, useRef, useEffect } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import Clock, { ITimeClock, IClockRef } from '@/components/widgets/Clock/Clock';

import type { IInterval } from './AddIntervalTimes';
import type { IAllInterval } from './AddIntervalTimes';


const Time = ({
    initialState,
    setState,
    position
}:{
    initialState: IInterval,
    setState: React.Dispatch<React.SetStateAction<IInterval>>, 
    position: 'start' | 'finish'
}) => {

    const refClock = useRef<IClockRef>(null);
    const [oneInterval, setOneInterval] = useState<ITimeClock>(initialState[position]);

    const onOpenClock = () => {
        refClock.current?.openClock();
    }

    useEffect(() => {
        setState(state => ({...state, [position]: oneInterval}) );
    }, [oneInterval]);

    return(
        <>
            <Clock 
                setSelectedTime={setOneInterval} 
                selectedTime={oneInterval} 
                ref={refClock} 
            />

            <Pressable 
                onPress={() => onOpenClock()}
                style={styles.boxTime} 
            >
                <Text style={styles.textTime}>{`${oneInterval.hour}:${oneInterval.minute}`}</Text>
            </Pressable>
        </>

    )
}

interface ITimeElement {
    id: number;
    allInterval: IAllInterval[];
    setAllInterval: React.Dispatch<React.SetStateAction<IAllInterval[]>>;
}


/**
 * @shared 
 */
const TimeElement: FC<ITimeElement> = ({
    id,
    allInterval,
    setAllInterval
}) => {

    const [timeInterval, setTimeInterval] = useState<IInterval>({
        start: {hour: '04', minute: '10'},
        finish: {hour: '21', minute: '00'}
    });

    console.log('Element = ', timeInterval);

    return (
        <View style={styles.time_body} >
            <Time 
                initialState={timeInterval}
                setState={setTimeInterval}
                position='start'
            />
            <Text style={styles.tire}>до</Text>
            <Time
                initialState={timeInterval}
                setState={setTimeInterval}
                position='finish'
            />
            <View style={styles.imgBox} >
                <Image 
                    style={styles.img}
                    source={require('@/source/img/icon/del-btn.png')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10
    },
    container: {
        width: '90%',
        backgroundColor: COLOR_ROOT.LIGHT_BLUE,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 25,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5
    },
    time: {
        
    },
    time_body: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInterval: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center'
    },
    boxTime: {
        backgroundColor: 'white',
        paddingHorizontal: 18,
        paddingVertical: 5,
        borderRadius: 14
    },
    textTime: {
        fontSize: 16,
        fontWeight: '400'
    },
    tire: {
        textAlign: 'center',
        fontSize: 17,
        paddingHorizontal: 10
    },
    imgBox: {
        marginLeft: 10,
        height: 20,
        width: 20
    },
    img: {
        tintColor: COLOR_ROOT.BUTTON_COLOR_RED,
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    }
});

export default TimeElement;