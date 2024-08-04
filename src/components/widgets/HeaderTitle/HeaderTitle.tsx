import { View, Text, StyleSheet, Image, Pressable, Platform } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import { useRouter } from 'expo-router';
import VibrationApp from '@/helpers/helpersForComponents/vibration/VibrationApp';


interface IHeaderTitle {
    text: string;
    imgFilter?: number;
    handlePessImgFilter?: Function;
}


/**
 * @shared `Текст загаловка.`
 * @param text Текст загаловка.
 * @optional
 * @param imgFilter ? Иконка для дополнительной функциональности header.
 * @param handlePessImgFilter ? Функция обработки нажатия на иконку.
 * @example <HeaderTitle text={#} />
 */
const HeaderTitle: FC<IHeaderTitle> = ({
    text,
    imgFilter,
    handlePessImgFilter
}) => {

    const router = useRouter();

    return (
        <View style={styles.main}>
            <Pressable 
                style={styles.boxImg} 
                onPress={() => {
                    VibrationApp.pressButton();
                    router.back();
                }}
            >
                <Image style={styles.img} source={require('@/source/img/icon-menu/arrow-white.png')} />
            </Pressable>
            <Text style={[styles.text]} >{text}</Text>
            {
                imgFilter && handlePessImgFilter
                ?
                <Pressable 
                    style={styles.filter} 
                    onPress={() => {
                        VibrationApp.select();
                        handlePessImgFilter();
                    }}
                >
                    <Image style={styles.filter_img} source={require('@/source/img/icon/filter_white.png')} />
                </Pressable>
                :
                null
            }
        </View>
    )
};

const styles = StyleSheet.create({
    main: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: COLOR_ROOT.MAIN_COLOR
    },
    boxImg: {        
        position: 'absolute',
        left: 0,
        width: 80,
        height: '100%',
        paddingVertical: Platform.OS === 'ios' ? 0 : 2,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    img: {
        resizeMode: 'contain',
        width: 28,
        height: '100%',
        opacity: .9,
    },
    text: {
        fontSize: Platform.OS === 'ios' ? 19 : 18,
        fontWeight: '500',
        color: 'white'
    },
    filter: {
        position: 'absolute',
        top: '50%',
        height: 36,
        marginTop: -8,
        right: 10,
        width: 37,
        padding: 3
    },
    filter_img: {resizeMode: 'contain', width: '100%', height: '100%'}
});

export default HeaderTitle;