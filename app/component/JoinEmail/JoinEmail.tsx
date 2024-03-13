import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TypeRootPage } from '@/navigation/navigation.types';


/**
 * @component Кнопка, вход че
 * @example 
 * @returns {JSX.Element}
 */
const JoinEmail: FC = () => {

    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>();

    return (
        <Pressable 
            style={styles.main}
            onPress={() => navigate('Registration')}
        >
            <View style={styles.container}>
                <Image source={require('@/source/img/logo/email.png')} style={styles.img} />
                <Text style={styles.text} >Регистрация с Email</Text>
            </View>
            
        </Pressable>
    );
};

const styles = StyleSheet.create({
    main: {
        width: '90%',
        height: 60,
        borderRadius: 35,
        backgroundColor: COLOR_ROOT.MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        position: 'relative'
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        paddingLeft: 30,
        color: 'white'
    },
    img:{
        position: 'absolute',
        left: -10,
        top: 2,
        width: 20,
        height:20
    }
});

export default JoinEmail;