import { COLOR_ROOT } from '@/data/colors';
import React, { FC, useState, useMemo } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, Pressable, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Gesture, GestureDetector, NativeGesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, interpolate, runOnJS, SharedValue } from 'react-native-reanimated';

interface IButtonSwipeable {

    children: JSX.Element | JSX.Element[];
    totalButton: 1 | 2 | 3;
    onPressButton1: Function;

    onPressButton2?: Function;
    onPressButton3?: Function;
    iconForButton1?: number;
    iconForButton2?: number;
    iconForButton3?: number;
    paddingForButton?: number;
    colorButton1?: string;
    colorButton2?: string;
    colorButton3?: string;
}

/**
 * @widgets `Кнопка со скрытыми кнопками.`
 * @param children Дочерний элемент оболочки.
 * @param totalButton Количество кнопок под кнопкой.
 * @param onPressButton1 Функция обработываюшая нажатия на кнопку #1.
 * @optional
 * @param onPressButton2 ? Функция обработываюшая нажатия на кнопку #2.
 * @param onPressButton3  ? Функция обработываюшая нажатия на кнопку #3.
 * @param iconForButton1 ? Иконка кнопки #1.
 * @param iconForButton2 ? Иконка кнопки #2.
 * @param iconForButton3 ? Иконка кнопки #3.
 * @param paddingForButton ? Отступ для появляюшихся кнопок.
 * @param colorButton1 ? Цвет кнопки 1.
 * @param colorButton2 ? Цвет кнопки 2.
 * @param colorButton3 ? Цвет кнопки 3.
 * @param isScrollActiveSv ? SharedValue устанавливаюшее активность внешнего скрола.
 */
const ButtonSwipeable: FC<IButtonSwipeable> = ({ 
    children, 
    totalButton, 
    onPressButton1, 
    onPressButton2, 
    onPressButton3,
    iconForButton1 = require('@/source/img/icon/add-btn.png'),
    iconForButton2 = require('@/source/img/icon/edit-btn.png'),
    iconForButton3 = require('@/source/img/icon/del-btn.png'),
    paddingForButton = 23,
    colorButton1 = COLOR_ROOT.BUTTON_COLOR_GREEN,
    colorButton2 = COLOR_ROOT.BUTTON_COLOR_YELLOW,
    colorButton3 = COLOR_ROOT.BUTTON_COLOR_RED,
}) => {
    /**
     * @param isActiveButton Состояние кнопки, в открытом или закрытом состоянии находится кнопка.
     */
    const [isActiveButton, setIsActiveButton] = useState<boolean>(false);
    /**
     * Ширина экрана телефона.
     */
    const windowsWidth = Dimensions.get('window').width;
    /**
     * Выделенная ширина под кнопки.
     */
    const activeWidth = windowsWidth * 50 / 100;
    /**
     * Ширина одной кнопки.
     */
    const widthButton = activeWidth / totalButton;
    /**
     * Отсечка смешения.
     */
    const activeWidthLeft = -activeWidth;
    /**
     * Смешение кнопки основной.
     */
    const translateButtonSv = useSharedValue<number>(0);
    /**
     * Последняя позиция кнопки основной.
     */
    const positionButtonSv = useSharedValue<number>(0);
    /**
     * Смешение кнопки #1.
     */
    const translateDownButton1Sv = useSharedValue<number>(0);
    /**
     * Последняя позиция кнопки #1.
     */
    const positionDownButton1Sv = useSharedValue<number>(0);
    /**
     * Смешение кнопки #2.
     */
    const translateDownButton2Sv = useSharedValue<number>(0);
    /**
     * Последняя позиция кнопки #2.
     */
    const positionDownButton2Sv = useSharedValue<number>(0);
    /**
     * Смешение кнопки #3.
     */
    const translateDownButton3Sv = useSharedValue<number>(0);
    /**
     * Последняя позиция кнопки #3.
     */
    const positionDownButton3Sv = useSharedValue<number>(0);
    /**
     * Обновление состояния смешения кнопки.
     * @param translationX Смешение по оси Х.
     */
    const update = (translationX: number) => {
        'worklet';
        translateButtonSv.value = positionButtonSv.value + translationX;
        translateDownButton1Sv.value = positionDownButton1Sv.value + translationX;

        translateDownButton2Sv.value = positionDownButton2Sv.value + interpolate(translationX, [0, -activeWidthLeft], [0, -activeWidthLeft - widthButton]);
        translateDownButton3Sv.value = positionDownButton3Sv.value + interpolate(translationX, [0, -activeWidthLeft], [0, -activeWidthLeft - widthButton * 2]);
    }
    /**
     * Переместить кнопку в позицию открытого состояния.
     */
    const openStateButton = (duration: number) => {
        'worklet';
        translateButtonSv.value = withTiming(activeWidthLeft, {duration});
        translateDownButton1Sv.value = withTiming(activeWidthLeft, {duration});
        translateDownButton2Sv.value = withTiming(activeWidthLeft + widthButton, {duration});
        translateDownButton3Sv.value = withTiming(activeWidthLeft + widthButton * 2, {duration});

        positionButtonSv.value = activeWidthLeft;
        positionDownButton1Sv.value = activeWidthLeft;
        positionDownButton2Sv.value = activeWidthLeft + widthButton;
        positionDownButton3Sv.value = activeWidthLeft + widthButton * 2;
    }
    /**
     * `Переместить кнопку в позицию закрытого состояния.`
     * @param isAnimated С анимацией или без запускать.
     */
    const closeStateButton = (isAnimated: boolean = true) => {
        'worklet';
        if(isAnimated) {
            translateButtonSv.value = withTiming(0, {duration: 200}); 
            translateDownButton1Sv.value = withTiming(0, {duration: 200});
            translateDownButton2Sv.value = withTiming(0, {duration: 200});
            translateDownButton3Sv.value = withTiming(0, {duration: 200});
        } else {
            translateButtonSv.value = 0; 
            translateDownButton1Sv.value = 0;
            translateDownButton2Sv.value = 0;
            translateDownButton3Sv.value = 0;
        }
        positionDownButton2Sv.value = 0;
        positionDownButton1Sv.value = 0;
        positionButtonSv.value = 0;
        positionDownButton3Sv.value = 0;
    }
    /**
     * Обработчик жестов.
     */
    const panGesture = useMemo(() => Gesture.Pan()
        .onUpdate(({translationX, translationY}) => {
            if(translationX < 0) {
                update(translationX);
            }
            if(positionButtonSv.value === activeWidthLeft && translationX > 0) {
                update(translationX);
            }
        })
        .onEnd(({translationX}) => {
            if(translationX < 0) {
                // Движение с права на лева <<< --- <<<
                if(translateButtonSv.value > activeWidthLeft / 3) {
                    closeStateButton();
                } else {
                    openStateButton(100);
                }
            } else {
                // Движение с лева на права >>> --- >>>
                closeStateButton();
            }
        }),[]);
    // animated styles
    const animatedStyleButton = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateButtonSv.value
                }
            ]
        }
    });
    const animatedStyleDownButton1 = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateDownButton1Sv.value
                }
            ]
        }
    });
    const animatedStyleDownButton2 = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateDownButton2Sv.value
                }
            ]
        }
    });
    const animatedStyleDownButton3 = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateDownButton3Sv.value
                }
            ]
        }
    });
    /**
     * Обработка нажатия основной кнопки.
     */
    const onHandlePress = () => {
        'worklet';
        runOnJS(setIsActiveButton)(state => !state);
        if(isActiveButton) {
            closeStateButton();
        } else {
            openStateButton(250);
        }
    }

    /**
     * Обьединение работы жестов.
     */
    const composedGestures = 
    Gesture.Simultaneous(
        panGesture
    )


    return (
        <View style={styles.body} >
            <GestureDetector gesture={composedGestures} >
                <Animated.View style={[styles.button, animatedStyleButton]} >
                    <Pressable 
                        style={styles.button_press}
                        onPress={() => onHandlePress()}
                    >
                        {children}
                    </Pressable>
                </Animated.View>
            </GestureDetector>
            <View style={[styles.down]}>
                <Animated.View 
                    style={[
                        styles.down_button_common, 
                        animatedStyleDownButton1,
                        {
                            width: widthButton, 
                            right: -widthButton, 
                            backgroundColor: colorButton1
                        }
                    ]} 
                >
                    <Pressable 
                        style={{flex: 1, padding: paddingForButton}}
                        onPress={
                            onPressButton1 
                            ? 
                            () => { 
                                onPressButton1(); 
                                closeStateButton(false);
                            } 
                            : 
                            null
                        }
                    >
                        <Image source={iconForButton1} style={styles.img}/>
                    </Pressable>
                </Animated.View>
                {
                    totalButton === 2 || totalButton === 3 
                    ?
                    <Animated.View 
                        style={[ 
                            styles.down_button_common, 
                            animatedStyleDownButton2,
                            {
                                width: widthButton, 
                                right: -widthButton,
                                backgroundColor: colorButton2
                            }
                        ]} 
                    >
                        <Pressable 
                            style={{flex: 1, padding: paddingForButton}} 
                            onPress={
                                onPressButton2 
                                ? 
                                () => {
                                    onPressButton2();
                                    closeStateButton(false);
                                } 
                                : 
                                null
                            }
                        >
                            <Image source={iconForButton2} style={styles.img}/>
                        </Pressable>
                    </Animated.View>
                    :
                    null
                }
                {
                    totalButton === 3 
                    ?
                    <Animated.View 
                        style={[
                            styles.down_button_common, 
                            animatedStyleDownButton3,
                            {
                                width: widthButton,
                                right: -widthButton,
                                backgroundColor: colorButton3
                            }
                        ]} 
                    >
                        <Pressable 
                            style={{flex: 1, padding: paddingForButton}} 
                            onPress={
                                onPressButton3 
                                ? 
                                () => {
                                    onPressButton3();
                                    closeStateButton(false);
                                }
                                : 
                                null
                            }
                        >
                            <Image source={iconForButton3} style={styles.img}/>
                        </Pressable>
                    </Animated.View>
                    : 
                    null
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: { position: 'relative',  width: '100%' },
    button: { width: '100%' },
    down: { position: 'absolute', top: 0, right: 0, height: '100%', flexDirection: 'row', justifyContent: 'flex-end' },
    down_button_common: { position: 'absolute', top: 0, height: '100%' },
    button_press: { justifyContent: 'center', alignItems: 'center' },
    img: { objectFit: 'contain', width: '100%', height: '100%' }
});

export default ButtonSwipeable;