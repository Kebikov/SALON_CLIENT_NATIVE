import { View, Text, StyleSheet, ImageBackground, Platform } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import JoinGoogle from '@/components/shared/JoinGoogle/JoinGoogle';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import DoYouHaveAnAccount from '@/components/shared/DoYouHaveAnAccount/DoYouHaveAnAccount';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router,  } from 'expo-router';
import { useHookGetStartDataUser } from '@/hooks/useHookGetStartDataUser';


/**
 * @page Стартовая страница приложения.
 */
const Index: FC = () => {
    
    /**
     * @param showThisComponent Переменная для показа или прерывания отображения компонента.
     */
    const [showThisComponent, setShowThisComponent] = useState<boolean>(false);

    const {getStartDataUser} = useHookGetStartDataUser();

    const goToPageRegistration = () => {
        router.navigate('authCreateAccount');
    }

    const goToPageAuthEnter = () => {
        router.navigate('authEnter');
    }

    //const routes = getRoutes();

    useEffect(() => {
        /**
         * Переход на домашнюю страницу в случае существования пользователя.
         */
        async function check() {
            const curentUser = await AsyncStorage.getItem('@user');
            if(curentUser) {
                const role = await getStartDataUser();
                console.log('role >>> ', role);
                if(!role) return;

                if(role === 'admin') return router.navigate('(admin)');
                if(role === 'client') return router.navigate('(user)');
                
            } else {
                setShowThisComponent(true);
            }
            
        };
        check();
    }, []);

    if(!showThisComponent) return;


    return (
        <>
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
    blurContainer: {
        backgroundColor: 'rgba(0,0,0, 0.3)',
        width: '100%',
        height: 300,
        padding: 20,
        overflow: 'hidden',
        borderRadius: 20,
        position: 'relative',
        zIndex: 1,
        top: 50
    },
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
        bottom: 40,
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
        position: 'relative',
        zIndex: 10,
        color: 'white',
        fontSize: Platform.OS === 'ios' ? 23 : 21,
        fontWeight: '600',
        textAlign: 'center',
    },
    textSubTitle: {
        color: 'white',
        fontSize: Platform.OS === 'ios' ? 17 : 16,
        fontWeight: '400',
        opacity: .85,
        marginTop: 20,
        marginBottom: 40,
        textAlign: 'center',
        lineHeight: 21
    }
});


export default Index;