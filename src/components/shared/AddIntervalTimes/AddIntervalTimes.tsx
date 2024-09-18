import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { FC, useState, useRef, useEffect } from 'react';
import ButtonWithIcon from '../ButtonWithIcon/ButtonWithIcon';
import { COLOR_ROOT } from '@/data/colors';
import Clock, { ITimeClock, IClockRef } from '@/components/widgets/Clock/Clock';
import TimeElement from './TimeElement';

export interface IInterval {
    start: ITimeClock;
    finish: ITimeClock;
}

export interface IAllInterval extends IInterval {
    id: number;
}

/**
 * @shared `Добавление интервалов времени.`
 */
const AddIntervalTimes: FC = () => {

    const [allInterval, setAllInterval] = useState<IAllInterval[]>([]);

    const addInterval = () => {
        setAllInterval(state => ([...state, {id: state.length + 1, start: {hour: '09', minute: '00'}, finish: {hour: '21', minute: '00'}}]))
    }


    return (
        <View style={styles.main}>
            <View style={styles.container} >
                <Text style={styles.textInterval} >Интервалы работы:</Text>
                <View style={styles.time}>
                    {
                        allInterval.map(item => 
                            <TimeElement 
                                id={item.id} 
                                allInterval={allInterval}
                                setAllInterval={setAllInterval}
                                key={item.id} 
                            />
                        )
                    }
                </View>
                <ButtonWithIcon
                    title='Добавить интервал'
                    pushButton={() => addInterval()}
                    img={require('@/source/img/icon/plus-white.png')}
                    height={45}
                    marginTop={20}
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

export default AddIntervalTimes;