import { View, StyleSheet, NativeSyntheticEvent, NativeScrollEvent, LayoutChangeEvent } from 'react-native';
import React, { FC, useState, useRef, useCallback } from 'react';
import { initialMonth } from './helper/initialMonth';
import { FlatList } from 'react-native-gesture-handler';
import DaysInTheMonth from './DaysInTheMonth';
import Time from '@/helpers/Time/Time';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import type { TSelect } from './Calendar';


interface IMonthDays {
    currentDay: string;
    setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
    select: TSelect;
}


/**
 * `Количество элементов до и после опорного.`
 * - Например при 10, будет добавлено в массив десять элементов до и десять элементов после опорного.
 * - Длинна массива при 10 будет 21 элемент.
 */
const TOTAL_ELEMENT = 5;
/**
 * `Внутренние отступы у месяцев.`
 */
const CONTAINER_PADDING = 10;


/**
 * @component `Дни месяца.`
 * @param currentDay Дата с которой работаем. '2022-02-28'
 * @param setCurrentDay Установка даты с которой работаем.
 * @param setIsShow Установка видимости календаря.
 * @param select Множественный выбор да или нет.
 */
const Month: FC<IMonthDays> = ({
    currentDay, 
    setCurrentDay,
    setIsShow,
    select
}) => {
    const flatListRef = useRef<number>(0);
    let previousIndex = TOTAL_ELEMENT;
    /**
     * @param visibleMonths Массив месяцев.
     * @example ['2022-02-01', '2022-03-01', ...]
     */
    const [visibleMonths, setVisibleMonths] = useState<string[]>(initialMonth(currentDay, TOTAL_ELEMENT));
    /**
     * @param widthElement 
     */
    const [widthElement, setWidthElement] = useState<number>(0);
    /**
     * `Высота дней в теле календаря.`
     */
    const svHeightMonth = useSharedValue<number>(0);
    
    let startDrag = 0;
    /**
     * Начало скрола.
     */
    const handleBeginDrag = useCallback((event:  NativeSyntheticEvent<NativeScrollEvent>) => {
        const {contentOffset} = event.nativeEvent;
        startDrag = contentOffset.x;
    }, []);
    /**
     * `Изминение высоты дней календаря.`
     */
    const changeHeight = (state: string) => {
        'worklet';
        const value = Time.getArrayForMonth(state).length > 35 ? widthElement * 6 / 7 : widthElement * 5 / 7;
        svHeightMonth.value = withTiming(value, {duration: 300});
    }
    /**
     * Обновление скрола.
     */
    const handleOnScroll = useCallback((event:  NativeSyntheticEvent<NativeScrollEvent>) => {
        if(widthElement === 0) return;
        const offSet = event.nativeEvent.contentOffset.x;
        const index = Math.round(offSet / widthElement);
        const delta = startDrag - offSet;
        const deltaAbs = Math.abs(delta);
        if(deltaAbs > widthElement / 2 && index !== previousIndex) {
            if(index > previousIndex) {
                setCurrentDay(state => {
                    const newState = Time.plusMinusMonth('plus', state);
                    changeHeight(newState);
                    return newState;
                });
                previousIndex = index;
            } else if(index < previousIndex){
                setCurrentDay(state => {
                    const newState = Time.plusMinusMonth('minus', state);
                    changeHeight(newState);
                    return newState;
                });
                previousIndex = index;
            }
        }
    }, [widthElement]);

    /**
     * Скролл закончен. 
     */
    const handleOnMomentumScrollEnd = useCallback((event:  NativeSyntheticEvent<NativeScrollEvent>) => {
        const offSet = event.nativeEvent.contentOffset.x;
        const index = Math.round(offSet / widthElement);

        if(index === TOTAL_ELEMENT * 2) {
            setVisibleMonths(state => initialMonth(state[TOTAL_ELEMENT * 2], TOTAL_ELEMENT));
            previousIndex = TOTAL_ELEMENT;
            flatListRef.current++;
        } 

        if(index === 0) {
            setCurrentDay(state => Time.plusMinusMonth('minus', state));
            setVisibleMonths(state => initialMonth(state[0], TOTAL_ELEMENT));
            previousIndex = TOTAL_ELEMENT;
            flatListRef.current++;
        }
            
    }, [widthElement]);
    /**
     * Рендер элементов.
     */
    const renderItems = useCallback(({item}: {item: string}) => {

        return(
            <View style={[styles.container, {width: widthElement}]} >
                <DaysInTheMonth 
                    day={item} 
                    widthMonth={widthElement} 
                    select={select} 
                    setIsShow={setIsShow} 
                />
            </View>
        )
    }, [visibleMonths, widthElement]);

    const onLayout = (event: LayoutChangeEvent) => {
        if(widthElement) return;
        const { width } = event.nativeEvent.layout;
        svHeightMonth.value = Time.getArrayForMonth(currentDay).length > 35 ? width * 6 / 7 : width * 5 / 7
        setWidthElement(width);
    }

    const animatedStyle = useAnimatedStyle(() => {
        return{
            height: svHeightMonth.value
        }
    });

    if(visibleMonths.length === 0) return;

    return (
        <View style={[styles.main, {paddingHorizontal: CONTAINER_PADDING}]} >
            <Animated.View style={[animatedStyle, {width: '100%'}]} onLayout={onLayout} >
                <FlatList
                    key={flatListRef.current}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}

                    data={visibleMonths}
                    renderItem={renderItems}
                    keyExtractor={item => item}
                    extraData={visibleMonths}
                    
                    pagingEnabled
                    onScrollBeginDrag={handleBeginDrag}
                    onScroll={handleOnScroll}

                    onMomentumScrollEnd={handleOnMomentumScrollEnd}

                    windowSize={5}
                    scrollEventThrottle={16}
                    getItemLayout={(data, index) => (
                        { length: widthElement, offset: widthElement * index, index }
                    )}
                    initialScrollIndex={TOTAL_ELEMENT}
                /> 
            </Animated.View>
        </View>
    );
};


const styles = StyleSheet.create({
    main: {
        marginTop: 5
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Month;

