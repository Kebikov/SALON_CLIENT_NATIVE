import React, { FC } from 'react';
import { StyleSheet, Button, View, Text, NativeSyntheticEvent, NativeScrollEvent, LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, useAnimatedRef } from 'react-native-reanimated';


const Test: FC = () => {
    /**
     * Смешение модального окна.
     */
    const mainSv = useSharedValue<number>(0);
    /**
     * Высота модального окна.
     */
    const heightContainer = useSharedValue<number>(0);
    /**
     * Активен ли скролл в модальном окне.
     */
    const isScrollActiveSv = useSharedValue<boolean>(false);
    /**
     * Ref для скрола.
     */
    const animatedRef = useAnimatedRef<Animated.ScrollView>();
    /**
     * @function `onLayoutContainer` - Для установки высоты модального окна и начального положения.
     */
    const onLayoutContainer = (e: LayoutChangeEvent) => {
        const height = e.nativeEvent.layout.height;
        heightContainer.value = height;
        mainSv.value = height;
    }
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
        mainSv.value = withTiming(heightContainer.value, {duration: 400});
    }
    /**
     * @function `defaultPositionModal` - Возврат модального окна в открытое состояние.
     */
    const defaultPositionModal = () => {
        'worklet';
        mainSv.value = withTiming(0, {duration: 300});
    }
    /**
     * Обработчик жестов для блока со скролом.
     */
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
    /**
     * Обработчик жестов для блока шапки.
     */
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
    /**
     * @function `onScroll` - Слушатель изминения скролла.
     */
    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffset = e.nativeEvent.contentOffset.y;
        if(mainSv.value === 0) {
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
     * @function `onPress` - Открытие модального окна.
     */
    const onPress = () => {
        'worklet';
        defaultPositionModal();
        scrollDefault();
    }
    /**
     * Анимирование модального окна.
     */
    const mainAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: mainSv.value
                }
            ]
        }
    });
    /**
     * Формирование содержимого для теста.
     */
    const textElements = Array(50).fill(null).map((_, i) => (
        <Text style={{fontSize: 30}} key={i} >{`${i} Lorem`}</Text>
    ));

    return (
        <View style={styles.main}>
            <View style={styles.button}>
                <Button title='Открыть модальное окно' color={'blue'} onPress={onPress} />
            </View>
            <Animated.View style={[styles.container, mainAnimatedStyle]} onLayout={onLayoutContainer} >
                <GestureDetector gesture={panGestureSHeader} >
                    <Header/>
                </GestureDetector>
                <GestureDetector gesture={composedGestures}>
                    <Animated.ScrollView
                        // Получение данных о работе скрола.
                        onScroll={onScroll}
                        // Переодичность в мс. обновления данных о скроле.
                        scrollEventThrottle={16}
                        ref={animatedRef}
                        // Это свойство управляет тем, будет ли ScrollView иметь эффект пружины.
                        bounces={false} 
                        // Это свойство управляет тем, будет ли ScrollView иметь эффект пружины по вертикали.
                        alwaysBounceVertical={false}
                        showsVerticalScrollIndicator={false}
                        style={[styles.scrollView]}
                    >
                        <View style={{padding: 10}}>
                            {textElements}
                        </View>
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
    container: { width: '100%', height: '70%', overflow: 'hidden', borderTopRightRadius: 25, borderTopLeftRadius: 25 },
    scrollView: { flex: 1, backgroundColor: 'green' },
    header: { width: '100%', height: 40, backgroundColor: 'red', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    line: { width: 34, height: 6, borderRadius: 4, backgroundColor: 'blue' }
});

export default Test;