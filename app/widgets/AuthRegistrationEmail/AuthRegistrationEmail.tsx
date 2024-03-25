import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import DoYouHaveAnAccount from '@/shared/DoYouHaveAnAccount/DoYouHaveAnAccount';
import  Animated, { useAnimatedStyle, useSharedValue, withTiming, withSpring } from 'react-native-reanimated';
import { Iscreen } from '@/pages/Auth/Auth';


interface IAuthRegistrationEmail {
    screen: Iscreen;
    setScreen: React.Dispatch<React.SetStateAction<Iscreen>>;
}


/**
 * @widgets Блок регистрации пользователя через Email.
 */
const AuthRegistrationEmail: FC<IAuthRegistrationEmail> = ({screen, setScreen}) => {

    /**
     * Значение трансформации блока.
     */
    const transformStartBlock = useSharedValue(500);
    /**
     * Style анимации блока.
     */
    const animatedRegBlock = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: transformStartBlock.value}
            ]
        }
    });

    if(screen.AuthRegistrationEmail) {
        transformStartBlock.value = withSpring(0,{duration: 2000, dampingRatio: 1});
    } else {
        transformStartBlock.value = withSpring(500,{duration: 2000, dampingRatio: 1});
    }


    return (
        <Animated.View style={[styles.main, animatedRegBlock]} >
            <View style={styles.box}>
                <Text style={styles.text} >Регистрация</Text>
                <TextInput style={styles.input} placeholder='Email' />
                <TextInput style={styles.input} placeholder='Password' />
                <Pressable style={styles.button} >
                    <Text style={styles.buttonText} >создать</Text>
                </Pressable>
                <DoYouHaveAnAccount setScreen={setScreen} isAuthUser={true} />
            </View>
        </Animated.View>
    );
};


export const styles = StyleSheet.create({
    main: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%'
    },
    text: {
        color: 'white',
        fontSize: 22
    },
    input: {
        borderColor: COLOR_ROOT.MAIN_COLOR,
        borderWidth: 4,
        borderRadius: 30,
        fontSize: 20,
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: 'white',
        width: '100%',
        marginTop: 15
    },
    button: {
        width: '100%',
        height: 55,
        backgroundColor: COLOR_ROOT.MAIN_COLOR,
        marginTop: 25,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'white'
    }
});


export default AuthRegistrationEmail;