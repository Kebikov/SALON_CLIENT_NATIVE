import { StyleSheet, NativeSyntheticEvent, NativeScrollEvent, useWindowDimensions, Image, Platform } from 'react-native';
import React, { useImperativeHandle, forwardRef } from 'react';
import { baseLink } from '@/api/axios/axios.instance/instance';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';
import { COLOR_ROOT } from '@/data/colors';


export interface IAnimatedHeaderUserRef {
    handleScroll: (event:  NativeSyntheticEvent<NativeScrollEvent>) => void;
}

interface IAnimatedHeaderUser {
    title: string;
    subtitle: string | undefined;
    picture: string;
}


const HEADER_SIZE = 150;
const FONT_SIZE_TITLE = Platform.OS === 'ios' ? 18 : 16;
const FONT_SIZE_SUBTITLE = Platform.OS === 'ios' ? 13 : 12;
const IMG_SIZE = Platform.OS === 'ios' ? 74 : 70;


/**
 * @widgets `Анимированный title user.`
 * @param title Заголовок.
 * @param picture Изображение.
 * @param subtitle Под заголовоко.
 */
const AnimatedHeaderUser = forwardRef<IAnimatedHeaderUserRef, IAnimatedHeaderUser>(({
    title,
    subtitle,
    picture
}, ref) => {

    const {height} = useWindowDimensions();
    /**
     * `Скрол за который header станет невидим.`
     */
    const needScroll = height / 3.5;
    /**
     * `Значение на сколько уменьшаем размер в %.`
     */
    const flatListOffset = useSharedValue<number>(0);

    const handleScroll = (event:  NativeSyntheticEvent<NativeScrollEvent>) => {
        'worklet';
        const {
            contentOffset, 
            contentSize, 
            layoutMeasurement
        } = event.nativeEvent;
        /**
         * `Сколько надо скролить до конца FlatList.`
         */
        const availableScrollLength = contentSize.height - layoutMeasurement.height;

        if(contentOffset.y <= 0) {
            flatListOffset.value = 0;
        } else {
            if(contentOffset.y >= availableScrollLength) return;
            flatListOffset.value = contentOffset.y;
        }
    };

    const animationHeader = useAnimatedStyle(() => {
        return {
            height: interpolate(flatListOffset.value, [0, needScroll], [HEADER_SIZE, 0], Extrapolation.CLAMP)
        }
    });

    const animationImg = useAnimatedStyle(() => {
        return{
            width: interpolate(flatListOffset.value, [0, needScroll], [IMG_SIZE, 0], Extrapolation.CLAMP),
            height: interpolate(flatListOffset.value, [0, needScroll], [IMG_SIZE, 0], Extrapolation.CLAMP),
            opacity: interpolate(flatListOffset.value, [0, needScroll], [1, 0], Extrapolation.CLAMP)
        }
    });

    const animationMasterName = useAnimatedStyle(() => {
        return {
            fontSize: interpolate(flatListOffset.value, [0, needScroll], [FONT_SIZE_TITLE, 0]),
            opacity: interpolate(flatListOffset.value, [0, needScroll], [1, 0], Extrapolation.CLAMP)
        }
    });

    const animationMasterDepartment = useAnimatedStyle(() => {
        return {
            fontSize: interpolate(flatListOffset.value, [0, needScroll], [FONT_SIZE_SUBTITLE, 0]),
            opacity: interpolate(flatListOffset.value, [0, needScroll], [1, 0], Extrapolation.CLAMP)
        }
    });

    useImperativeHandle(ref, () =>({
        handleScroll: (event) => handleScroll(event)
    }));


    return (
        <Animated.View style={[styles.header, animationHeader]}>
            <Animated.View style={animationImg}>
                <Image 
                    style={styles.img} 
                    source={picture ? {uri: `${baseLink}/api/img/get-img/${picture}?type=img_imgMaster`} : undefined} 
                />
            </Animated.View>
            <Animated.Text style={[styles.masterName, animationMasterName]} >{title}</Animated.Text>
            <Animated.Text style={[styles.masterDepartment, animationMasterDepartment]} >{subtitle}</Animated.Text>
        </Animated.View>
    );
});


const styles = StyleSheet.create({
    header: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_ROOT.MAIN_COLOR,
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 150,
        borderWidth: 2,
        borderColor: 'white'
    },
    masterName: {
        color: 'white',
        fontWeight: '500',
        marginTop: 10
    },
    masterDepartment: {
        color: 'white',
        textTransform: 'lowercase'
    }
});


export default AnimatedHeaderUser;