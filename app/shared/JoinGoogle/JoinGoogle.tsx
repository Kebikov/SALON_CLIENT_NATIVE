import { View, Text, StyleSheet, Image } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';

/**
 * @component Кнопка, вход с Google.
 * @example <JoinGoogle/>
 * @returns {JSX.Element}
 */
const JoinGoogle: FC = () => {

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Image source={require('@/source/img/logo/google.png')} style={styles.img} />
                <Text style={styles.text} >Регистрация с Google</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: 60,
        borderRadius: 35,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    container: {
        position: 'relative'
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        paddingLeft: 30,
        color: COLOR_ROOT.MAIN_COLOR
    },
    img:{
        position: 'absolute',
        left: -10,
        top: -5,
        width: 35,
        height:35
    }
});

export default JoinGoogle;