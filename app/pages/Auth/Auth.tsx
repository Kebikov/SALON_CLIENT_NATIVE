import { View, Text, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import React, { FC, useState } from 'react';
import AuthStart from '@/widgets/AuthStart/AuthStart';
import AuthRegistrationEmail from '@/widgets/AuthRegistrationEmail/AuthRegistrationEmail';
import AuthAuthorization from '@/widgets/AuthAuthorization/AuthAuthorization';


export interface Iscreen {
    AuthStart: boolean;
    AuthRegistrationEmail: boolean;
    AuthAuthorization: boolean;
}



/**
 * @page Стартовая страница авторизации.
 */
const Auth: FC = () => {

    /**
     * @param screen Состояние блоков, скрывать их или нет.
     */
    const [screen, setScreen] = useState<Iscreen>(
        {
            AuthStart: true, 
            AuthRegistrationEmail: false,
            AuthAuthorization: false
        }
    );


    return (
        <>
            <StatusBar backgroundColor={'rgba(0,0,0,0)'} translucent />
            <ImageBackground style={styles.main} source={require('@/source/img/auth/main-crop.jpg')} >
                <View style={styles.overlay} />
                <AuthStart screen={screen} setScreen={setScreen} />
                <AuthRegistrationEmail screen={screen} setScreen={setScreen} />
                <AuthAuthorization screen={screen} setScreen={setScreen} />
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
    }
});


export default Auth;