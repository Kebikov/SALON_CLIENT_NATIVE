import { View, Text, StyleSheet, Dimensions, Modal, Pressable, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { forwardRef, useImperativeHandle, useEffect, useState, useRef } from 'react';
import React, { FC } from 'react';
import Animated, { useSharedValue, withTiming, withSpring, withClamp, useAnimatedStyle, ReduceMotion, Easing, runOnJS } from 'react-native-reanimated';
import { GestureDetector, Gesture, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

export interface BottomListRef {
    open: () => void;
    close: () => void;
}

interface BottomListProps {
    children: JSX.Element | JSX.Element[];
    heightProcent: number;
}


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
    const durationOpenAndClose = 500;

    /**
     * @param visibleModal Видимость модального окна.
     */
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [scrollAccess, setScrollAccess] = useState<boolean>(true);

    const translateY = useSharedValue<number>(1000);
    const opacityColor = useSharedValue<number>(0);


    const animatedStyleMain = useAnimatedStyle(() => {
        return {
            transform: [
                {translateY: translateY.value}
            ]
        }
    });

    const animatedStyleModal = useAnimatedStyle(() => {
        return {
            backgroundColor: `rgba(0, 0, 0, ${opacityColor.value})`
        }
    });

    useImperativeHandle(ref, () => ({
        open: () => openList(),
        close: () => closeList()
    }));

    const openList = () => {
        'worklet';
        setVisibleModal(true);
        setScrollAccess(true);
        translateY.value = withTiming(0, {duration: durationOpenAndClose, easing: Easing.inOut(Easing.ease), reduceMotion: ReduceMotion.System});
        opacityColor.value = withTiming(.5, {duration: durationOpenAndClose});
    }

    const closeList = () => {
        'worklet';
        opacityColor.value = withTiming(0, {duration: durationOpenAndClose});
        translateY.value = withTiming(1000, {duration: durationOpenAndClose}, () => {
            runOnJS(setVisibleModal)(false);
        });
    }


    const panGesture = Gesture.Pan()
        .enabled(scrollAccess)
        .onUpdate((event) => {
            console.log('translationY >>> ', event.translationY);
            if(event.translationY < 0) {
                runOnJS(setScrollAccess)(false);
            } 
            console.log('scrollAccess', scrollAccess);
            if(scrollAccess && event.translationY > 0) {
                console.log('YES');
                translateY.value = event.translationY;
            }
        })
        .onEnd(() => {
            if(translateY.value > hi / 5) {
                closeList();
            } else {
                translateY.value = withTiming(0, {duration: 300});
            }
        })
    
    const hendleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const y = e.nativeEvent.contentOffset.y;
        console.log('contentOffset >>> ', e.nativeEvent.contentOffset.y);
        console.log('scrollAccess >>> ', scrollAccess);
        if(y <= 0) {
            runOnJS(setScrollAccess)(true);
        }
    }

    return (
        <Modal
            transparent={true}
            visible={visibleModal}
        >
            <GestureHandlerRootView style={{flex: 1}}>
                <Animated.View style={[{flex: 1}, animatedStyleModal]} >
                    <GestureDetector gesture={panGesture} >
                        <Animated.View style={[styles.main, animatedStyleMain]} >
                            <View style={styles.container} >
                                <View style={styles.header} >
                                    <View style={styles.line}></View>
                                    <Pressable onPress={() => closeList()} style={styles.cross} >
                                        <View style={[ styles.crossLine, styles.crossOneLine]}></View>
                                        <View style={[ styles.crossLine, styles.crossTwoLine]}></View>
                                    </Pressable>
                                </View>
                                <ScrollView
                                    scrollEnabled={!scrollAccess}
                                    onScroll={(e) => hendleScroll(e)}
                                >
                                    {children}
                                </ScrollView>
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
        height: '70%',
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