import { View, Text, StyleSheet, Image, Pressable, Platform } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import { useRouter } from 'expo-router';


interface IHeaderTitle {
    text: string;
}


/**
 * @shared `Текст загаловка.`
 * @param text Текст загаловка.
 * @param marginTop ? Отступ с верху.
 * @example <HeaderTitle text={#} />
 */
const HeaderTitle: FC<IHeaderTitle> = ({text}) => {

    const router = useRouter();

    return (
        <Pressable 
            style={styles.main}
            onPress={() => router.back()}
        >
            <View style={styles.boxImg} >
                <Image style={styles.img} source={require('@/source/img/icon-menu/arrow-white.png')} />
            </View>
            <Text style={[styles.text]} >{text}</Text>
        </Pressable>
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
        top: '50%',
        left: 7,
        width: 22,
        height: 22,
    },
    img: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
        opacity: .9,
    },
    text: {
        fontSize: Platform.OS === 'ios' ? 19 : 18,
        fontWeight: '500',
        color: 'white'
    }
});

export default HeaderTitle;