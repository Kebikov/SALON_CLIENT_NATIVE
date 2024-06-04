import React, { FC } from 'react';
import { StyleSheet, Button, View, Text, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, useAnimatedRef } from 'react-native-reanimated';


const Test: FC = () => {
    const mainSv = useSharedValue(1000);
    const isScrollActiveSv = useSharedValue<boolean>(false);

    const animatedRef = useAnimatedRef<Animated.ScrollView>();

    const scrollOn = () => {
        'worklet';
        isScrollActiveSv.value = true;
        if(animatedRef.current) animatedRef.current.setNativeProps({screensEnabled: true});
    }

    const scrollOff = () => {
        'worklet';
        isScrollActiveSv.value = false;
        if(animatedRef.current) animatedRef.current.setNativeProps({screensEnabled: false});
    }

    const scrollDefault = () => {
        'worklet';
        if(animatedRef.current) animatedRef.current.scrollTo({x: 0, y: 0, animated: true});
    }

    const closeModal = () => {
        'worklet';
        scrollOff();
        scrollDefault();
        mainSv.value = withTiming(1000, {duration: 800});
    }


    const defaultPositionModal = () => {
        'worklet';
        mainSv.value = withTiming(0, {duration: 300});
    }

    const panGestureScroll = Gesture.Pan()
        .onUpdate(({ translationY }) => {
            if(translationY >= 0 && !isScrollActiveSv.value) {
                mainSv.value = translationY;
            } 
        })
        .onEnd(({ translationY }) => {
            if(translationY > 100 && !isScrollActiveSv.value) {
                closeModal();
            } else {
                defaultPositionModal();
            }
        });
    
    const panGestureSHeader = Gesture.Pan()
        .onUpdate(({translationY}) => {
            if(translationY >= 0) mainSv.value = translationY;
        })
        .onEnd(({translationY}) => {
            if(translationY > 100) {
                closeModal();
            } else {
                defaultPositionModal();
            }
        });
    
    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffset = e.nativeEvent.contentOffset.y;
        console.log(contentOffset);
        if(mainSv.value === 0) {
            if(contentOffset <= 0) {
                scrollOff();
            } else {
                scrollOn();
            }
        }
    };

    const nativeGesture = Gesture.Native();
    const composedGestures = Gesture.Simultaneous(
        panGestureScroll,
        nativeGesture,
    );

    const onPress = () => {
        'worklet';
        defaultPositionModal();
        scrollDefault();
    }


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
        <Text style={{fontSize: 80}} key={i} >{`${i} Lorem`}</Text>
    ));

    return (
        <View style={styles.main}>
            <View style={styles.button}>
                <Button title='Открыть модальное окно' color={'blue'} onPress={onPress} />
            </View>
            <Animated.View style={[styles.container, mainAnimatedStyle, styles.border]}>
                <GestureDetector gesture={panGestureSHeader} >
                    <Header/>
                </GestureDetector>
                <GestureDetector gesture={composedGestures}>
                    <Animated.ScrollView
                        onScroll={onScroll}
                        ref={animatedRef}
                        // Это свойство управляет тем, будет ли ScrollView иметь эффект пружины.
                        bounces={false} 
                        // Это свойство управляет тем, будет ли ScrollView иметь эффект пружины по вертикали.
                        alwaysBounceVertical={false}
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

const Header = () => {
    return(
        <View style={styles.header}>
            <View style={styles.line} />
        </View>
    )
}

const styles = StyleSheet.create({
    main: { position: 'relative', flex: 1, flexDirection: 'row', alignItems: 'flex-end' },
    button: { position: 'absolute', top: 50, left: 0, width: '100%', height: 50 },
    container: { position: 'relative', width: '100%', height: '70%', overflow: 'hidden' },
    border: { borderTopRightRadius: 25, borderTopLeftRadius: 25,},
    scrollView: {
        flex: 1, 
        backgroundColor: 'green', 
        padding: 15
    },
    header: {
        width: '100%',
        height: 40,
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    line: {
        width: 40,
        height: 6,
        borderRadius: 4,
        backgroundColor: 'blue'
    }
});

export default Test;