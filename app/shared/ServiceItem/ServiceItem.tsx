import { View, Text, StyleSheet, Image } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';

interface IServiceItem {
    title: string;
    img: number;
}

/**
 * @shared Карточка-иконка сервиса.
 */
const ServiceItem: FC<IServiceItem> = ({title, img}) => {
    console.log(img);
    

    return (
        <View style={styles.main} >
            <View style={styles.boxImg}>
                <Image style={styles.img} source={img} />
            </View>
            <Text style={styles.text} >{title}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    main: {
        width: 100,
        height: 100,
        overflow: 'hidden',
        //backgroundColor: 'red',
        alignItems: 'center'
    },
    boxImg: {
        width: 75,
        height: 75,
        borderRadius: 500,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLOR_ROOT.MAIN_COLOR,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        resizeMode: 'cover',
        width: '70%',
        height: '70%'
    },
    text: {
        color: COLOR_ROOT.MAIN_COLOR,
        fontSize: 15,
        fontWeight: '400',
        textAlign: 'center'
    }
});


export default ServiceItem;