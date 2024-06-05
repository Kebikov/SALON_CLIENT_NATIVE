import { styles } from './style';
import {IBottomModalSheet, IRefBottomModalSheet} from './types';

import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, NativeSyntheticEvent, NativeScrollEvent, Modal, Dimensions, Button } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, useAnimatedRef, runOnJS } from 'react-native-reanimated';


/**
 * @wrapper `Модальное окно всплываюшее с низу.`
 * @param ref Реф для получения доступа к функциям.
 * @param heightProcent ? Высота в процентах числом.
 * @param backgroundColorHeader ? Цвет шапки.
 * @param borderRadiusHeader ? Радиус краев шапки.
 * @param backgroundColorLine ? Цвет линии в шапке.
 * @param buttonForModal ? Кнопка внизу модального окна или любой другой компонент.
 * @param durationOpenAndClose ? Скорость открытия и закрытия модального окна.
 * @example 
 * <BottomModalSheet ref={#} >
 *     {children}
 * </BottomModalSheet>
 */
const BottomModalSheet = forwardRef<IRefBottomModalSheet, IBottomModalSheet>((
    {
        children,
        heightProcent = 70,
        backgroundColorHeader = 'white',
        borderRadiusHeader = 15,
        backgroundColorBody = 'white',
        backgroundColorLine = 'grey',
        buttonForModal = undefined,
        durationOpenAndClose = 500
    }, 
    ref) => {
    /**
     * Высота экрана телефона.
     */
    const hi = Dimensions.get('window').height;
    /**
     * @param visibleModal Видимость модального окна.
     */
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    /**
     * `Прозрачность заднего фона.`
     */
    const opacityColor = useSharedValue<number>(0);
    /**
     * Смешение модального окна.
     */
    const containerSv = useSharedValue<number>(hi);
    /**
     * Активен ли скролл в модальном окне.
     */
    const isScrollActiveSv = useSharedValue<boolean>(false);
    /**
     * Ref для скрола.
     */
    const animatedRef = useAnimatedRef<Animated.ScrollView>();
    /**
     * @function `scrollOn` - Включение работы скрола.
     */
    const scrollOn = () => {
        'worklet';
        isScrollActiveSv.value = true;
        if(animatedRef.current) animatedRef.current.setNativeProps({screensEnabled: true});
    }
    /**
     * @function `scrollOff` - Выключение работы скрола.
     */
    const scrollOff = () => {
        'worklet';
        isScrollActiveSv.value = false;
        if(animatedRef.current) animatedRef.current.setNativeProps({screensEnabled: false});
    }
    /**
     * @function `scrollDefault` - Установка значений скрола в начальное состояние.
     */
    const scrollDefault = () => {
        'worklet';
        if(animatedRef.current) animatedRef.current.scrollTo({x: 0, y: 0, animated: true});
    }
    /**
     * @function `closeModal` - Закрытие модального окна.
     */
    const closeModal = () => {
        'worklet';
        scrollOff();
        scrollDefault();
        containerSv.value = withTiming(hi, {duration: durationOpenAndClose}, () => {
            runOnJS(setVisibleModal)(false);
        });
        opacityColor.value = withTiming(0, {duration: durationOpenAndClose});
    }
    /**
     * @function `openModal` - Возврат модального окна в открытое состояние.
     */
    const openModal = () => {
        'worklet';
        setVisibleModal(true);
        containerSv.value = withTiming(0, {duration: durationOpenAndClose});
        opacityColor.value = withTiming(.5, {duration: durationOpenAndClose});
    }
    /**
     * Обработчик жестов для блока со скролом.
     */
    const panGestureScroll = Gesture.Pan()
        .onUpdate(({ translationY }) => {
            if(translationY >= 0 && !isScrollActiveSv.value) {
                containerSv.value = translationY;
            } 
        })
        .onEnd(({ translationY }) => {
            if(translationY > 100 && !isScrollActiveSv.value) {
                closeModal();
            } else {
                containerSv.value = withTiming(0, {duration: durationOpenAndClose});
            }
        });
    /**
     * Обработчик жестов для блока шапки.
     */
    const panGestureSHeader = Gesture.Pan()
        .onUpdate(({translationY}) => {
            if(translationY >= 0) containerSv.value = translationY;
        })
        .onEnd(({translationY}) => {
            if(translationY > 100) {
                closeModal();
            } else {
                containerSv.value = withTiming(0, {duration: 300});
            }
        });
    /**
     * @function `onScroll` - Слушатель изминения скролла.
     */
    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffset = e.nativeEvent.contentOffset.y;
        if(containerSv.value === 0) {
            if(contentOffset <= 0) {
                scrollOff();
            } else {
                scrollOn();
            }
        }
    };
    /**
     * Обработчик нативных жестов.
     */
    const nativeGesture = Gesture.Native();
    /**
     * Обьединение работы жестов.
     */
    const composedGestures = Gesture.Simultaneous(
        panGestureScroll,
        nativeGesture,
    );
    /**
     * Анимирование модального окна.
     */
    const containerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: containerSv.value
                }
            ]
        }
    });
    /**
     * `Анимированый стиль - модального окна.`
     */
    const animatedStyleModal = useAnimatedStyle(() => {
        return {
            backgroundColor: `rgba(0, 0, 0, ${opacityColor.value})`
        }
    });

    useImperativeHandle(ref, () => ({
        openModal: () => openModal(),
        closeModal: () => closeModal()
    }));

    return (
        <Modal 
            transparent={true} 
            visible={visibleModal}
        >
            <GestureHandlerRootView style={{flex: 1}} >
                <Animated.View style={[{flex: 1}, animatedStyleModal]} >
                    <View style={styles.main} >
                        <Animated.View 
                            style={[
                                styles.container, 
                                containerAnimatedStyle, 
                                { 
                                    height: `${heightProcent}%`,
                                    borderTopRightRadius: borderRadiusHeader,
                                    borderTopLeftRadius: borderRadiusHeader
                                }
                            ]} 
                        >
                            <GestureDetector gesture={panGestureSHeader} >
                                <View style={[styles.header, {backgroundColor: backgroundColorHeader}]}>
                                    <View style={[styles.line, {backgroundColor: backgroundColorLine}]} />
                                </View>
                            </GestureDetector>
                            <GestureDetector gesture={composedGestures}>
                                <Animated.ScrollView
                                    // Получение данных о работе скрола.
                                    onScroll={onScroll}
                                    // Переодичность в мс. обновления данных о скроле.
                                    scrollEventThrottle={16}
                                    ref={animatedRef}
                                    showsVerticalScrollIndicator={false}
                                    style={[styles.scrollView, {backgroundColor: backgroundColorBody}]}
                                >
                                    <View style={{padding: 10}}>
                                        {children}
                                    </View>
                                </Animated.ScrollView>
                            </GestureDetector>
                            {buttonForModal ? buttonForModal : null}
                        </Animated.View>
                    </View>
                </Animated.View>
            </GestureHandlerRootView>
        </Modal>
    );
});

export default BottomModalSheet;