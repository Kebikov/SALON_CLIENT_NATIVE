import { View, Text, StyleSheet, ImageBackground, StatusBar, Pressable, LayoutChangeEvent } from 'react-native';
import React, { FC } from 'react';
import  Animated, { useAnimatedStyle, useSharedValue, withTiming, withSpring } from 'react-native-reanimated';
import JoinGoogle from '@/shared/JoinGoogle/JoinGoogle';
import JoinEmail from '@/shared/JoinEmail/JoinEmail';
import { useState, useEffect } from 'react';
import DoYouHaveAnAccount from '@/shared/DoYouHaveAnAccount/DoYouHaveAnAccount';
import { Iscreen } from '@/pages/Auth/Auth';


interface IAuthStart {
    screen: Iscreen;
    setScreen: React.Dispatch<React.SetStateAction<Iscreen>>;
}


/**
 * @widgets Стартовый блок при регистрации.
 * @param screen Обьект состояния отображения блоков регистрации.
 * @param setScreen Функция установки состояния отображения блоков регистрации.
 */
const AuthStart: FC<IAuthStart> = ({screen, setScreen}) => {

    /**
     * Значение трансформации блока.
     */
    const transformStartBlock = useSharedValue(0);
    /**
     * Style анимации блока.
     */
    const animatedStartBlock = useAnimatedStyle(() => {
        return {
            transform: [
                {translateY: transformStartBlock.value}
            ]
        }
    });

    if(!screen.AuthStart) {
        transformStartBlock.value = withSpring(500,{duration: 2000, dampingRatio: 1});
    } else {
        transformStartBlock.value = withSpring(0,{duration: 2000, dampingRatio: 1});
    }


    return (
        <Animated.View style={[ styles.authStart, animatedStartBlock ]} >
            <View style={styles.box}>
                <Text style={styles.textTitle} >Давай, присоеденяйся к нам !</Text>
                <View style={styles.titleBox} >
                    <Text style={styles.textSubTitle} >Лучшие Beauty мастера ждут тебя. Маникюр, парикмахерские услуги, лазерная эпиляция и многое еще.</Text>
                </View>
                <JoinEmail setScreen={setScreen} />
                <JoinGoogle/>
                <DoYouHaveAnAccount setScreen={setScreen} isAuthUser={true} />
            </View>
        </Animated.View>
    );
};


const styles = StyleSheet.create({
    authStart: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    box: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '90%',
    },
    titleBox: {
        width: '100%'
    },
    textTitle: {
        color: 'white',
        fontSize: 21,
        fontWeight: '600',
        textAlign: 'center'
    },
    textSubTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400',
        opacity: .85,
        marginTop: 20,
        marginBottom: 40,
        textAlign: 'center',
        lineHeight: 21
    }
});


export default AuthStart;