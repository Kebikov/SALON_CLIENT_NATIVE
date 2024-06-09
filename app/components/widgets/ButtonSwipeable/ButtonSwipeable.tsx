import { useHookButtonSwipeable } from './hooks/useHookButtonSwipeable';
import { useHookAnimatedStyle } from './hooks/useHookAnimatedStyle';
import { COLOR_ROOT } from '@/data/colors';
import React, { FC, useState, useMemo } from 'react';
import { StyleSheet, View, Dimensions, Image, Pressable } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS } from 'react-native-reanimated';


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
    const {
        update, 
        openStateButton, 
        closeStateButton,
        positionButtonSv,
        translateButtonSv,
        translateDownButton1Sv,
        translateDownButton2Sv,
        translateDownButton3Sv
    } = useHookButtonSwipeable(activeWidthLeft, widthButton);
    const {
        animatedStyleButton,
        animatedStyleDownButton1,
        animatedStyleDownButton2,
        animatedStyleDownButton3
    } = useHookAnimatedStyle(translateButtonSv, translateDownButton1Sv, translateDownButton2Sv, translateDownButton3Sv);

    /**
     * Обработчик жестов.
     */
    const panGesture = useMemo(() => Gesture.Pan()
        .activeOffsetX([-10, 10])
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

    return (
        <View style={styles.body} >
            <GestureDetector gesture={panGesture} >
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
                    style={[styles.down_button_common, animatedStyleDownButton1,
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
                        style={[styles.down_button_common, animatedStyleDownButton2,
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
                        style={[styles.down_button_common, animatedStyleDownButton3,
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

