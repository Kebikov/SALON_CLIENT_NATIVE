import React, { useState, FC } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { COLOR_ROOT } from '@/data/colors';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';


interface ISwitcher {
    height?: number;
    width?: number;
    diameter?: number;
    isEnabledInitial?: boolean;
    padding?: number;
    setState?: React.Dispatch<React.SetStateAction<boolean | undefined>>
    colorLeft?: string;
    colorRight?: string;
    animatedDuration?: number;
}

/**
 * `Switch компонент.`
 * @optional
 * @param height ? Высота контейнера.
 * @param width ? Ширина контейнера.
 * @param diameter ? Диаметр круга.
 * @param isEnabledInitial ? Начальное состояние(вкл./выкл.).
 * @param padding ? Отступ внутри контейнера.
 * @param setState ? Функция установки state у родительского компонента.
 * @param colorLeft ? Цвет в левом положении.
 * @param colorRight ? Цвет в правом положении.
 * @param animatedDuration ? Продолжительность анимации.
 */
const Switcher: FC<ISwitcher> = ({
    height = 33,
    width = 52, 
    diameter = 22,
    isEnabledInitial = false,
    padding = 4,
    setState,
    colorLeft = COLOR_ROOT.BUTTON_COLOR_RED,
    colorRight = COLOR_ROOT.BUTTON_COLOR_GREEN,
    animatedDuration = 200
}) => {

	const [isEnabled, setIsEnabled] = useState(isEnabledInitial);

    const circlePositionLeft = useSharedValue<number>(isEnabledInitial ? width - diameter - padding * 2 - 2 : 2);
    const circleColor = useSharedValue<string>(isEnabledInitial ? colorRight : colorLeft);

    const onPress = () => {
        'worklet';
        if(isEnabled) {
            if(setState) setState(false);
            setIsEnabled(false);
            circleColor.value = withTiming(colorRight, {duration: animatedDuration});
            circlePositionLeft.value = withTiming(width - diameter - padding * 2 - 2, {duration: animatedDuration});
        } else {
            if(setState) setState(true);
            setIsEnabled(true);
            circleColor.value = withTiming(colorLeft, {duration: animatedDuration});
            circlePositionLeft.value = withTiming(2, {duration: animatedDuration});
        }
    }

    const amimatedStyle = useAnimatedStyle(() => {
        return {
            left: circlePositionLeft.value
        }
    });

    const amimatedStyleBody = useAnimatedStyle(() => {
        return {
            backgroundColor: circleColor.value
        }
    });

	return (
        <Pressable
            style={[styles.container, {height, width, padding}]} 
            onPress={() => onPress()}
        >
            <Animated.View style={[styles.body, amimatedStyleBody]}>
                <Animated.View style={[styles.circle, amimatedStyle, {width: diameter, height: diameter}]} ></Animated.View>
            </Animated.View>
        </Pressable>
    )
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
    body: {
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: 20
    },
    circle: {
        position: 'absolute',
        top: '50%',
        marginTop: -11,
        borderRadius: 100,
        backgroundColor: 'white'
    }
});

export default Switcher;
