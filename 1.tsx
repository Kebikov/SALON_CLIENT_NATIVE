import React, { FC, useRef } from 'react';
import { StyleSheet, Button, View, Text, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, useDerivedValue, scrollTo, useAnimatedRef } from 'react-native-reanimated';
const size: number = 88;
const initialStateScroll: boolean = false;

const Test: FC = () => {
    console.log('-----------------------------------------------');
    const mainSv = useSharedValue(1000);
    const isScrollActiveSv = useSharedValue<boolean>(initialStateScroll);

    const animatedRef = useAnimatedRef<Animated.ScrollView>();
    const scroll = useSharedValue<number>(0);

    const panGesture = Gesture.Pan()
        .onUpdate(({ translationY }) => {
            console.log("translationY >>> ", translationY, isScrollActiveSv.value);
            if(translationY >= 0 && !isScrollActiveSv.value) {
                console.log('Двигаем тело...');
                mainSv.value = translationY;
            } 
        })
        .onEnd(({ translationY }) => {
            if(translationY > 200 && !isScrollActiveSv.value) {
                mainSv.value = withTiming(1000, {duration: 800});
                isScrollActiveSv.value = initialStateScroll;
            } else {
                mainSv.value = withTiming(0, {duration: 300});
            }
        });
    
        //: вынести в отдельную функции возврат скрола в исходноо состояние e.target.setNativeProps({contentOffset: {x: 0, y: 0}});
    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        console.log('contentOffsetScrollSv >>> ', e.nativeEvent.contentOffset.y);
        const contentOffset = e.nativeEvent.contentOffset.y;

        if(mainSv.value === 0) {
            if(contentOffset <= 0) {
                e.target.setNativeProps({screensEnabled: false});
                isScrollActiveSv.value = false;
            } else {
                e.target.setNativeProps({screensEnabled: true});
                isScrollActiveSv.value = true;
            }
        }
    };

    const nativeGesture = Gesture.Native();
    const composedGestures = Gesture.Simultaneous(
        panGesture,
        nativeGesture,
    );

    const onPress = () => {
        'worklet';
        mainSv.value = withTiming(0, {duration: 300})
    }

    const onScrollDefault = () => {
        'worklet';
        console.log('onScrollDefault', isScrollActiveSv.value);
        // scrollTo(animatedRef, 0, 50, true);
        scroll.value = 0;
    }

    useDerivedValue(() => {
        
        scrollTo(
          animatedRef,
          0,
          scroll.value,
          true
        );
      });

    const mainAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: mainSv.value
                }
            ]
        }
    });

    const textElements = Array(10).fill(null).map((_, i) => (
        <Text style={{fontSize: size}} key={i} >{`${i} Lorem`}</Text>
    ));

    return (
        <View style={styles.main}>
            <View style={styles.button}>
                <Button title='Открыть модальное окно' color={'blue'} onPress={onPress} />
            </View>
            <View style={[styles.button, styles.buttonScroll]}>
                <Button title='Скролл в начало' color={'green'} onPress={onScrollDefault} />
            </View>
            <Animated.View style={[styles.container, mainAnimatedStyle]}>
                <GestureDetector gesture={composedGestures}>
                    <Animated.ScrollView
                        onScroll={onScroll}
                        ref={animatedRef}
                        bounces={false}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        style={[styles.scrollView]}
                    >
                        {textElements}
                    </Animated.ScrollView>
                </GestureDetector>
            </Animated.View>
        </View>
    );
};

export default Test;

const styles = StyleSheet.create({
    main: {
        position: 'relative',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    button: {
        position: 'absolute',
        top: 50,
        left: 0,
        width: '100%',
        height: 50
    },
    buttonScroll: {
        top: 100,
    },
    container: { width: '100%', height: '70%', backgroundColor: 'white' },
    scrollView: { flex: 1, backgroundColor: 'white', padding: 16 },
    textInput: { position: 'absolute', marginTop: 16, marginHorizontal: 16 },
});