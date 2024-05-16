import { View, Text, StyleSheet, Image, TextInput, Platform } from 'react-native';
import React, { FC, useState, useEffect } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import type { IgetInfoBasic } from '@/api/routes/client/types/client.types';
import { useHookGetStartDataUser } from '@/hooks/useHookGetStartDataUser';
import { useAppSelector } from '@/redux/store/hooks';


/**
 * @widgets Блок с пользователем на главной странице в верху.
 */
const HomeUserHeader: FC = () => {

    const userInfo = useAppSelector(state => state.userSlice.user);

    const {getStartDataUser} = useHookGetStartDataUser();

    useEffect(() => {
        getStartDataUser();
    }, []);

    return (
        <View style={styles.main} >
            <View style={styles.box} >
                <View style={styles.rightBox} >
                    <View style={styles.boxAvatar} >
                        <Image style={styles.imgContain} source={
                            userInfo?.picture 
                            ? {uri: userInfo.picture}  
                            : 
                            require('@/source/img/avatar/1.png')} 
                        />
                    </View>
                    <View>
                        <Text style={styles.textHello} >Привет, {userInfo.name} !</Text>
                        <Text style={styles.textEmail} >{userInfo.email}</Text>
                    </View>
                </View>
                <View style={styles.boxBell} >
                    <Image style={styles.imgContain} source={require('@/source/img/icon/bell-white.png')}/>
                </View>
            </View>
            <View style={styles.bottom} >
                <View style={styles.boxInput} >
                    <TextInput style={styles.input} />
                    <Image style={styles.imgMagnifier} source={require('@/source/img/icon/magnifier.png')} />
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    main: {
        width: '100%',
        backgroundColor: COLOR_ROOT.MAIN_COLOR,
        borderBottomLeftRadius: 42,
        borderBottomRightRadius: 42,
        paddingBottom: 20
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 7
    },
    rightBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    boxAvatar: {
        width: 70,
        height: 70,
        borderRadius: 100,
        overflow: 'hidden',
        marginRight: 10
    },
    imgContain: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%'
    },
    boxBell: {
        width: 27,
        height: 27
    },
    textHello: {
        fontSize: 17,
        fontWeight: '500',
        color: 'white'
    },
    textEmail: {
        fontSize: 14,
        color: 'white',
        opacity: .7
    },
    bottom: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    boxInput: {
        width: '90%',
        position: 'relative'
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        fontSize: 18,
        paddingHorizontal: 20,
        paddingRight: 20,
        paddingLeft: 40,
        paddingVertical: 7
    },
    imgMagnifier: {
        position: 'absolute',
        top: '50%',
        left: 10,
        width: 22,
        height: 22,
        marginTop: -11,
        zIndex: 1
    }
});


export default HomeUserHeader;

