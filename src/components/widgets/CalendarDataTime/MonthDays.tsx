import { View, StyleSheet, NativeSyntheticEvent, NativeScrollEvent, useWindowDimensions } from 'react-native';
import React, { FC, useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import Time from '@/helpers/Time/Time';
import { FlatList } from 'react-native-gesture-handler';
import DaysInTheMonth from './DaysInTheMonth';

import type { TSelect } from './Calendar';


interface IMonthDays {
    currentDay: string;
    setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
    selectedDays: string[];
    setSelectedDays:  React.Dispatch<React.SetStateAction<string[]>>;
    select: TSelect;
}

export interface IRefMonthDays {
    nextMonth: () => void;
    previousMonth: () => void; 
}


/**
 * `Количество элементов до и после опорного.`
 * - Например при 10, будет добавлено в массив десять элементов до и десять элементов после опорного.
 * - Длинна массива при 10 будет 21 элемент.
 */
const TOTAL_ELEMENT = 12;


/**
 * @component `Дни месяца.`
 * @param currentDay Дата с которой работаем. '2022-02-28'
 * @param setCurrentDay Установка даты с которой работаем.
 * @param selectedDays Выбраные даты, массив.
 * @param setSelectedDays Установка выбранных дат.
 * @param select Множественный выбор да или нет.
 */
const MonthDays = forwardRef<IRefMonthDays, IMonthDays>(({
    currentDay,
    setCurrentDay,
    setIsShow,
    selectedDays,
    setSelectedDays,
    select,
}, ref) => {
    
    const {width} = useWindowDimensions();
    const containerPadding = 10;
    /**
     * `Ширина календаря всего, равная 80% от ширины экрана.`
     */
    const widthCalendar = width * 80 / 100 - containerPadding * 2;
    /**
     * `Формирование данных для состояния отображаемых месяцев.`
     * @param day Опорный день.
     * @param total Количество элементов до и после опорного.
     */
    const initialMonth = (day: string, total: number): string[] => {
        const arreyMonth: string[] = [];
        for(let i = total; i > 0; i--) {
            arreyMonth.push(Time.calcMonth(i * -1, day));
        }
        for(let i = 0; i <= total; i++) {
            arreyMonth.push(Time.calcMonth(i, day));
        }
        return arreyMonth;
    }

    const [visibleMonths, setVisibleMonths] = useState<string[]>([]);

    const refKey = useRef<string>(currentDay);
    const startDrag = useRef<number>(0);
    const refFlatList = useRef<FlatList>(null);

    const handleBeginDrag = (event:  NativeSyntheticEvent<NativeScrollEvent>) => {
        const {contentOffset} = event.nativeEvent;
        startDrag.current = contentOffset.x;
    }

    const renderItems = ({item}: {item: string}) => {
        return(
            <View style={[styles.container, {width: widthCalendar}]} >
                    <DaysInTheMonth 
                        day={item} 
                        widthCalendar={widthCalendar} 
                        selectedDays={selectedDays} 
                        select={select} 
                        setSelectedDays={setSelectedDays} 
                        setIsShow={setIsShow} 
                    />
            </View>
        )
    };

    let previousIndex = TOTAL_ELEMENT;

    const handleOnScroll = (event:  NativeSyntheticEvent<NativeScrollEvent>) => {
        console.log('SCROLL');
        const offSet = event.nativeEvent.contentOffset.x;
        const index = Math.round(offSet / widthCalendar);
        const delta = Math.abs(startDrag.current - offSet);

        if(delta > widthCalendar / 2 && index !== previousIndex) {
            setCurrentDay(visibleMonths[index]);
            previousIndex = index;

            if(index === 1) {
                setVisibleMonths(initialMonth(visibleMonths[1], TOTAL_ELEMENT));
                refKey.current = visibleMonths[1];
            }

            if(index === TOTAL_ELEMENT * 2) {
                setVisibleMonths(initialMonth(visibleMonths[TOTAL_ELEMENT * 2], TOTAL_ELEMENT));
                refKey.current = visibleMonths[TOTAL_ELEMENT * 2];
            }
        }
    }

    useImperativeHandle(ref, () => ({
        nextMonth: () => {
            if(refFlatList.current) {
                refFlatList.current.scrollToIndex({index: previousIndex + 1, animated: true});
                previousIndex++;
            }
        },
        previousMonth: () => {
            if(refFlatList.current) {
                refFlatList.current.scrollToIndex({index: previousIndex - 1, animated: true});
                previousIndex--;
            }
        }
    }));
    
    useEffect(() => {
        setVisibleMonths(initialMonth(currentDay, TOTAL_ELEMENT));
    }, []);

    if(visibleMonths.length === 0) return;

    return (
        <View style={[styles.main, {paddingHorizontal: containerPadding, height: widthCalendar * 6 / 7}]} >
            <FlatList
                ref={refFlatList}
                key={refKey.current}

                contentContainerStyle={styles.flatListContainer}
                showsHorizontalScrollIndicator={false}
                horizontal={true}

                data={visibleMonths}
                renderItem={renderItems}
                keyExtractor={item => item}
                extraData={visibleMonths}
                
                pagingEnabled
                onScrollBeginDrag={handleBeginDrag}
                onScroll={handleOnScroll}

                windowSize={5}
                scrollEventThrottle={16}
                getItemLayout={(data, index) => (
                    { length: widthCalendar, offset: widthCalendar * index, index }
                )}
                initialScrollIndex={TOTAL_ELEMENT}
            /> 
        </View>
    );
});


const styles = StyleSheet.create({
    main: {
        width: '100%',
        marginTop: 5
    },
    flatListContainer: {
        flexGrow: 1,
        height: '100%'
    },
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default MonthDays;