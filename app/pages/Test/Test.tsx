import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, 
    withDelay, withTiming, clamp, interpolate } from 'react-native-reanimated';


const Test = () => {
    console.log('-------------------------------------------');
    const mainSv = useSharedValue(0);
    const previousMainSv = useSharedValue(0);
    const isScrollActiveSv = useSharedValue<boolean>(false);
    const stateScrollSv = useSharedValue<'auto' | 'none'>('none');

    const scrollPanGesture = Gesture.Pan()
        .onUpdate(({ translationY }) => {
            console.log('*');
            console.log('translationY >>> ', translationY);
            console.log('stateScrollSv.value >>> ', stateScrollSv.value);
            console.log('isScrollActiveSv.value >>> ', isScrollActiveSv.value);

            if(translationY > 0 && !isScrollActiveSv.value) {
                console.log('Двигаем тело !!!');
                mainSv.value = translationY - previousMainSv.value;
            } 

            if(translationY < 0) {
                stateScrollSv.value = 'auto';
                isScrollActiveSv.value = true;
            }
        })
        .onEnd(() => {
            mainSv.value = withTiming(0, {duration: 300})
        })

    const nativeGesture = Gesture.Native();
    const composedGestures = Gesture.Simultaneous(
        scrollPanGesture,
        nativeGesture,
    );

    const onScroll = useAnimatedScrollHandler({
        onScroll({ contentOffset }) {
            console.log('contentOffset >>> ', contentOffset.y);

            if(contentOffset.y === 0) {
                stateScrollSv.value = 'none';
                isScrollActiveSv.value = false;
            } else {
                stateScrollSv.value = 'auto';
                isScrollActiveSv.value = true;
            }
        }
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
    const scrollAnimatedStyle = useAnimatedStyle(() => {
        return {
            pointerEvents: stateScrollSv.value
        }
    });
    const size = 88;

    return (
        <View style={styles.main}>
            <Animated.View style={[styles.container, mainAnimatedStyle]}>
                <GestureDetector gesture={composedGestures}>
                    <Animated.ScrollView
                        onScroll={onScroll}
                        bounces={false}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        style={[styles.scrollView, scrollAnimatedStyle]}
                    >
                        <Text style={{fontSize: size}}>1 Lorem</Text>
                        <Text style={{fontSize: size}}>2 Lorem</Text>
                        <Text style={{fontSize: size}}>3 Lorem</Text>
                        <Text style={{fontSize: size}}>4 Lorem</Text>
                        <Text style={{fontSize: size}}>5 Lorem</Text>
                        <Text style={{fontSize: size}}>6 Lorem</Text>
                        <Text style={{fontSize: size}}>7 Lorem</Text>
                        <Text style={{fontSize: size}}>Lorem</Text>
                        <Text style={{fontSize: size}}>Lorem</Text>
                        <Text style={{fontSize: size}}>Lorem</Text>
                        <Text style={{fontSize: size}}>Lorem</Text>
                        <Text style={{fontSize: size}}>Lorem</Text>
                    </Animated.ScrollView>
                </GestureDetector>
            </Animated.View>
        </View>
    );
};

export default Test;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    container: { width: '100%', height: '70%', backgroundColor: 'white' },
    scrollView: { flex: 1, backgroundColor: 'white', padding: 16 },
    textInput: { position: 'absolute', marginTop: 16, marginHorizontal: 16 },
});