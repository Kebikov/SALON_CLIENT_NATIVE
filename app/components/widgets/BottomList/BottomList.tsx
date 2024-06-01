import { View, Text, StyleSheet, Dimensions, Modal, Pressable, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { forwardRef, useImperativeHandle, useEffect, useState, useRef } from 'react';
import React, { FC } from 'react';
import Animated, { useSharedValue, withTiming, withSpring, withClamp, useAnimatedStyle, ReduceMotion, Easing, runOnJS, useAnimatedScrollHandler, clamp } from 'react-native-reanimated';
import { GestureDetector, Gesture, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

export interface BottomListRef {
    open: () => void;
    close: () => void;
}

interface BottomListProps {
    children: JSX.Element | JSX.Element[];
    heightProcent: number;
}

const durationOpenAndClose = 500;
const initialStateScroll: boolean = true;

type TpointerEvents = 'auto' | 'box-none' | 'box-only' | 'none';

/**
 * @widget Всплываюшее окно с низу экрана.
 * @param heightProcent Высота всплываюшего окна в процентах. Например: 40, будет 40% от высоты экрана.
 * @example 
 * <BottomList>
 *     {children}
 * </BottomList>
 * @returns {JSX.Element}
 */
const BottomList = forwardRef<BottomListRef, BottomListProps>(({children, heightProcent}, ref) => {

    const hi = Dimensions.get('window').height;

    const [isPanEnabled, setIsPanEnabled] = useState(initialStateScroll);
    /**
     * @param visibleModal Видимость модального окна.
     */
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    /**
     * `Смешение скрола внутри модального окна.`
     */
    const scrollTranslateY = useSharedValue<number>(0);
    /**
     * `Последняя позиция скрола.`
     */
    const previousScrollTranslateY = useSharedValue<number>(0);
    /**
     * `Смешение самого модального окна.`
     */
    const mainTranslateY = useSharedValue<number>(1000);
    /**
     * `Прозрачность заднего фона.`
     */
    const opacityColor = useSharedValue<number>(0);
    /**
     * `Анимированый стиль - тела модального окна.`
     */
    const animatedStyleMain = useAnimatedStyle(() => {
        return {
            transform: [
                {translateY: mainTranslateY.value}
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

    const openList = () => {
        'worklet';
        setVisibleModal(true);
        setIsPanEnabled(initialStateScroll);
        mainTranslateY.value = withTiming(0, {duration: durationOpenAndClose, easing: Easing.inOut(Easing.ease), reduceMotion: ReduceMotion.System});
        opacityColor.value = withTiming(.5, {duration: durationOpenAndClose});
    }

    const closeList = () => {
        'worklet';
        opacityColor.value = withTiming(0, {duration: durationOpenAndClose});
        mainTranslateY.value = withTiming(1000, {duration: durationOpenAndClose}, () => {
            runOnJS(setVisibleModal)(false);
        });
    }

    //* Жест перемешения.
    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            
            console.log('translationY >>> ', event.translationY);
            console.log('IsPanEnabled >>> ', isPanEnabled);

            if(event.translationY < 0 ) {
                'worklet';
                runOnJS(setIsPanEnabled)(false);
            } else {
                scrollTranslateY.value = event.translationY;
            }

        })
        .onEnd(() => {
            if(mainTranslateY.value > hi / 5) {
                //closeList();
            } else {
                //translateY.value = withTiming(0, {duration: 300});
            }
        })
        .enabled(isPanEnabled)

    /**
     * `Передача методов через ref.`
     */
    useImperativeHandle(ref, () => ({
        open: () => openList(),
        close: () => closeList()
    }));

    const updatePanState = (offset: number) => {
        'worklet';
        if (offset > 0) {
            runOnJS(setIsPanEnabled)(false);
        } else if (offset === 0) {
            runOnJS(setIsPanEnabled)(true);
        }
    };

    const onScroll = useAnimatedScrollHandler({
        onBeginDrag({ contentOffset }) {
            updatePanState(contentOffset.y);
        },
        onEndDrag({ contentOffset }) {
            updatePanState(contentOffset.y);
        },
        onMomentumEnd({ contentOffset }) {
            updatePanState(contentOffset.y);
        },
    });


    const nativeGesture = Gesture.Native();

    const composedGestures = Gesture.Simultaneous(
        panGesture,
        nativeGesture,
    );

    return (
        <Modal
            transparent={true}
            visible={visibleModal}
        >
            <GestureHandlerRootView style={{flex: 1}} >
                <Animated.View style={[{flex: 1}, animatedStyleModal]} >
                    <GestureDetector gesture={composedGestures} >
                        <Animated.View style={[styles.main, animatedStyleMain]} >
                            <View style={[styles.container, {height: `${heightProcent}%`}]} >
                                <View style={styles.header} >
                                    <View style={styles.line}></View>
                                    <Pressable onPress={() => closeList()} style={styles.cross} >
                                        <View style={[ styles.crossLine, styles.crossOneLine]}></View>
                                        <View style={[ styles.crossLine, styles.crossTwoLine]}></View>
                                    </Pressable>
                                </View>
                                <Animated.ScrollView
                                    onScroll={onScroll}
                                    scrollEnabled={!isPanEnabled}
                                    bounces={false}
                                    scrollEventThrottle={16}
                                    showsVerticalScrollIndicator={false}
                                    style={[{backgroundColor: 'white' }]}
                                >
                                    {children}
                                </Animated.ScrollView>
                            </View>
                        </Animated.View>
                    </GestureDetector>
                </Animated.View>
            </GestureHandlerRootView>
        </Modal>
    );
});

const styles = StyleSheet.create({
    main: {
        position: 'absolute',
        zIndex: 1000,
        flex: 1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        overflow: 'hidden'
    },
    container: {
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#fff',
        paddingHorizontal: 10
    },
    header: {
        position: 'relative',
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey'
    },
    line: {
        height: 5,
        width: 30,
        backgroundColor: 'red',
        borderRadius: 7
    },
    cross: {
        position: 'absolute',
        top: 0,
        right: -5,
        width: 50,
        height: 50,
        //backgroundColor: 'red'
    },
    crossLine: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        height: 2,
        marginTop: -1,
        width: 16,
        marginLeft: -8,
        backgroundColor: 'rgba(0, 0, 0, .5)'
    },
    crossOneLine: {
        transform: [ {rotate: '45deg'} ]
    },
    crossTwoLine: {
        transform: [ {rotate: '-45deg'} ]
    }
});

export default BottomList;