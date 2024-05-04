import { View, Text, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import JoinGoogle from '@/components/shared/JoinGoogle/JoinGoogle';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import DoYouHaveAnAccount from '@/components/shared/DoYouHaveAnAccount/DoYouHaveAnAccount';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { TypeRootPage } from '@/navigation/navigation.types';
import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * @page Стартовая страница авторизации.
 */
const Auth: FC = () => {

    /**
     * @param showThisComponent Переменная для показа или прерывания отображения компонента.
     */
    const [showThisComponent, setShowThisComponent] = useState<boolean>(false);

    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>();


    const goToPageRegistration = () => {
        navigate('AuthCreateAccount');
    }

    const goToPageAuthEnter = () => {
        navigate('AuthEnter');
    }



    useEffect(() => {
        /**
         * Переход на домашнюю страницу в случае существования пользователя.
         */
        async function check() {
            const curentUser = await AsyncStorage.getItem('@user');
            if(curentUser) {
                setShowThisComponent(true);
                navigate('Home');
            } else {
                setShowThisComponent(true);
            }
        };
        check();
    }, []);

    if(!showThisComponent) return;

    return (
        <>
            <StatusBar backgroundColor={'rgba(0,0,0,0)'} translucent />
            <ImageBackground style={styles.main} source={require('@/source/img/auth/main-crop.jpg')} >
                <View style={styles.overlay} />
                <View style={styles.authStart} >
                    <View style={styles.box}>
                        <Text style={styles.textTitle} >Давай, присоеденяйся к нам !</Text>
                        <View style={styles.titleBox} >
                            <Text style={styles.textSubTitle} >Лучшие Beauty мастера ждут тебя. Маникюр, парикмахерские услуги, лазерная эпиляция и многое еще.</Text>
                        </View>
                        <ButtonWithIcon pushButton={goToPageRegistration} title='Регистрация с Email' />
                        <JoinGoogle/>
                        <DoYouHaveAnAccount pushButton={goToPageAuthEnter} title='Уже есть аккаунт ?' textButton=' Войти' color='white' />
                    </View>
                </View>
            </ImageBackground>
        </>
    );
};


const styles = StyleSheet.create({
    main: {
        flex: 1,
        position: 'relative'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
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


export default Auth;