import { View, Text, StyleSheet, ImageBackground, StatusBar, Pressable } from 'react-native';

import React, { FC } from 'react';
import JoinGoogle from '@/component/JoinGoogle/JoinGoogle';
import JoinEmail from '@/component/JoinEmail/JoinEmail';

/**
 * @page Стартовая страница авторизации.
 * @returns {JSX.Element}
 */
//= Auth
const Auth: FC = () => {

    return (
        <>
            <StatusBar backgroundColor={'rgba(0,0,0,0)'} translucent />
            <ImageBackground style={styles.main} source={require('@/source/img/auth/main-crop.jpg')} >
                <View style={styles.overlay} />
                <Text style={styles.textTitle} >Давай, присоеденяйся к нам !</Text>
                <View style={styles.titleBox} >
                    <Text style={styles.textSubTitle} >Лучшие Beauty мастера ждут тебя. Маникюр, парикмахерские услуги, лазерная эпиляция и многое еще.</Text>
                </View>
                <JoinEmail/>
                <JoinGoogle/>
                <View style={styles.textBox} >
                    <Text style={styles.text} >Уже есть аккаунт ?</Text>
                    <Pressable>
                        <Text style={styles.textExit} >  Войти</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 20
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    titleBox: {
        width: '80%'
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
        textAlign: 'center'
    },
    textBox: {
        marginTop: 15,
        flexDirection: 'row'
    },
    text: {
        color: 'white',
        fontSize: 16
    },
    textExit: {
        color: 'orange',
        fontSize: 16
    }
});

export default Auth;