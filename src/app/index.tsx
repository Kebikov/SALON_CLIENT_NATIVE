import { View, Text, StyleSheet, ImageBackground, Platform, StatusBar } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import JoinGoogle from '@/components/shared/JoinGoogle/JoinGoogle';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import DoYouHaveAnAccount from '@/components/shared/DoYouHaveAnAccount/DoYouHaveAnAccount';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHookRouter } from '@/helpers/router/useHookRouter';
import { useHookGetStartDataUser } from '@/hooks/GET/useHookGetStartDataUser';



/**
 * @page Стартовая страница приложения. 
 */
const Index: FC = () => {

    
    const {appRouter} = useHookRouter();

    /**
     * @param showThisComponent Переменная для показа или прерывания отображения компонента.
     */
    const [showThisComponent, setShowThisComponent] = useState<boolean>(false);

    const {getStartDataUser} = useHookGetStartDataUser();

    useEffect(() => {

        /**
         * Переход на домашнюю страницу в случае существования пользователя.
         */
        async function check() {
            const currentUser = await AsyncStorage.getItem('@user');
            
            if(currentUser) {
                const role = await getStartDataUser();
                if(!role) return;

                if(role === 'admin') return appRouter.replace('/admin');
                if(role === 'client') return appRouter.replace('/user');
                
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
                <View style={{backgroundColor: 'transparent', height: Platform.OS === 'ios' ? 47 : StatusBar.currentHeight}} >
                    <StatusBar animated={true} barStyle={'light-content'} backgroundColor={'transparent'} />
                </View>
                <View style={styles.overlay} />
                <View style={styles.authStart} >
                    <View style={styles.box}>
                        <Text style={styles.textTitle} >Давай, присоеденяйся к нам !</Text>
                        <View style={styles.titleBox} >
                            <Text style={styles.textSubTitle} >Лучшие Beauty мастера ждут тебя. Маникюр, парикмахерские услуги, лазерная эпиляция и многое еще.</Text>
                        </View>
                        
                        <ButtonWithIcon pushButton={() => appRouter.navigate('/auth/authCreateAccount')} title='Регистрация с Email' />
                        <JoinGoogle/>
                        <DoYouHaveAnAccount pushButton={() => appRouter.navigate('/auth/authEnter')} title='Уже есть аккаунт ?' textButton=' Войти' color='white' />
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


  