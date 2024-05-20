import { View, Text, StyleSheet, ImageBackground, Image, Platform } from 'react-native';
import React, { FC, useEffect, useCallback } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import Animated, {withDelay, withTiming, withRepeat, withSequence, useSharedValue, useAnimatedStyle, Easing} from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';


interface IMasterCart {
    /**
     * Имя мастера.
     */
    masterName: string;
    /**
     * Специализация мастера.
     */
    masterUnit: string;
    /**
     * Рейтинг мастера.
     */
    grade: number;
    /**
     * Фото мастера.
     */
    img: number;
}

const DURATION = 100;

/**
 * @shared Мини-Карточка мастера.
 * @param masterName Имя мастера.
 * @param masterUnit Специализация мастера.
 * @param img Фото мастера.
 * @param grade Рейтинг мастера.
 * @param delay ? Параметр для задержки анимации.
 */
const MasterCart: FC<IMasterCart> = ({masterName, masterUnit, img, grade}) => {

    const viewRotate = useSharedValue(2);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: `${viewRotate.value}deg`
                }
            ]
        }
    });

    useFocusEffect(
        useCallback(() => {
            viewRotate.value = 
                withSequence(
                    withRepeat(
                        withSequence(
                            withTiming(-2, {
                                duration: DURATION,
                                easing: Easing.inOut(Easing.ease)
                            }),
                            withTiming(2, {
                                duration: DURATION,
                                easing: Easing.inOut(Easing.ease)
                            })
                        ), 2
                    ),
                    withTiming(0, {
                        duration: DURATION,
                        easing: Easing.inOut(Easing.ease)
                    })
                )
            

            return () => {
                setTimeout(() => {
                    viewRotate.value = 2;
                }, 300);
            };
        }, [])
    );


    return (
        <Animated.View style={[styles.main, animatedStyle]} >
            <View style={styles.box} >
                <View style={styles.boxBg} >
                    <ImageBackground style={styles.imageBackground} source={img} >
                        <View style={styles.grade}>
                            <View style={styles.gradeBox}>
                                <Image style={styles.gradeImg} source={require('@/source/img/icon/grade.png')}/>
                                <Text style={styles.gradeText} >{grade}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <Text style={styles.masterName} >{masterName}</Text>
                <Text style={styles.masterUnit} >{masterUnit}</Text>
            </View>
        </Animated.View>
    );
};


const styles = StyleSheet.create({
    main: {
        width: 145,
        height: 182,
        borderRadius: 16,
        padding: 8,
        backgroundColor: 'white',
        // shadows
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity:  0.18,
        shadowRadius: 4.59,
        elevation: 5,
    },
    box: {
        flex: 1
    },
    boxBg: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        overflow: 'hidden'
    },
    imageBackground: {
        flex: 1
    },
    grade: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 5
    },
    gradeBox: {
        flexDirection: 'row',
        backgroundColor: COLOR_ROOT.PINK,
        marginRight: 5,
        alignItems: 'center',
        paddingHorizontal: 4,
        paddingVertical: 1,
        borderRadius: 4
    },
    gradeImg: {
        width: 12,
        height: 12,
        marginRight: 5
    },
    gradeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600'
    },
    masterName: {
        color: COLOR_ROOT.BLACK,
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        fontWeight: '500',
        lineHeight: 17,
        paddingLeft: 5,
        paddingTop: 7
    },
    masterUnit: {
        color: COLOR_ROOT.LIGHT_ICON,
        fontSize: Platform.OS === 'ios' ? 14 : 13,
        fontWeight: '400',
        lineHeight: Platform.OS === 'ios' ? 17 : 15,
        paddingLeft: 5,
    }
});

export default MasterCart;