import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import React, { FC } from 'react';
import { styles as regStyles } from '../AuthRegistrationEmail/AuthRegistrationEmail';
import  Animated, { useAnimatedStyle, useSharedValue, withTiming, withSpring } from 'react-native-reanimated';
import { Iscreen } from '@/pages/Auth/Auth';
import JoinGoogle from '@/shared/JoinGoogle/JoinGoogle';
import DoYouHaveAnAccount from '@/shared/DoYouHaveAnAccount/DoYouHaveAnAccount';


interface IAuthAuthorization {
    screen: Iscreen;
    setScreen: React.Dispatch<React.SetStateAction<Iscreen>>;
}


/**
 * @widgets Авторизация пользователя.
 */
const AuthAuthorization: FC<IAuthAuthorization> = ({ screen, setScreen}) => {

    /**
     * Значение трансформации блока.
     */
    const transformStartBlock = useSharedValue(-500);
    /**
     * Style анимации блока.
     */
    const animatedAuthorizationBlock = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: transformStartBlock.value}
            ]
        }
    });

    if(screen.AuthAuthorization) {
        transformStartBlock.value = withSpring(0,{duration: 2000, dampingRatio: 1});
    } else {
        transformStartBlock.value = withSpring(-500,{duration: 2000, dampingRatio: 1});
    }
    

    return (
        <Animated.View style={[regStyles.main, animatedAuthorizationBlock]} >
            <View style={regStyles.box}>
                <Text style={regStyles.text} >Вход в аккаунт</Text>
                <TextInput style={regStyles.input} placeholder='Email' />
                <TextInput style={regStyles.input} placeholder='Password' />
                <JoinGoogle/>
                <Pressable style={[regStyles.button]} >
                    <Text style={regStyles.buttonText} >войти</Text>
                </Pressable>
                <DoYouHaveAnAccount setScreen={setScreen} isAuthUser={false} />
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
});

export default AuthAuthorization;