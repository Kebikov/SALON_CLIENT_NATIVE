import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import { useNavigation } from '@react-navigation/native';


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

    const {goBack} = useNavigation();

    return (
        <Pressable 
            style={styles.main}
            onPress={() => goBack()}
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: COLOR_ROOT.MAIN_COLOR
    },
    boxImg: {
        width: 25,
        height: 25,
    },
    img: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
        opacity: .9,
        
    },
    text: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: '600',
        color: 'white',
        marginLeft: 30
    }
});

export default HeaderTitle;