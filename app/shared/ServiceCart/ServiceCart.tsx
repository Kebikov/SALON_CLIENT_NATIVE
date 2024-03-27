import { View, Text, StyleSheet, Image } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';


/**
 * @shared Мини карточка услуги.
 */
const ServiceCart: FC = () => {

    return (
        <View style={styles.main} >
            <View style={styles.box} >
                <View style={styles.left} >
                    <Image style={styles.img} source={require('@/source/img/service-img/3.jpg')} />
                </View>
                <View style={styles.right} >
                    <Text style={styles.title} >Макияж свадебный</Text>
                    <Text style={styles.subTitle} >макияж и укладка</Text>
                    <Text style={styles.time} >Время: 40 мин.</Text>
                    <View style={styles.boxPrice} >
                        <View style={styles.price}>
                            <Text style={styles.textTotal}>45</Text>
                            <Text style={styles.textByn} > byn</Text>
                        </View>
                        <View style={styles.order}>
                            <Text style={styles.textOrder}>запись</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    main: {
        width: '100%',
        //height: 150,
        flexDirection: 'row',
        justifyContent:'center',
        marginTop: 10,
    },
    box: {
        width: '95%',
        height: '100%',
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // borderColor: COLOR_ROOT.LIGHT_GRAY,
        //borderWidth: 1,
        borderRadius: 25,
        //shadows
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity:  0.18,
        shadowRadius: 4.59,
        elevation: 5
    },
    left: {
        width: 110,
        height: 110,
        borderRadius: 15,
        overflow: 'hidden',
        marginRight: 10,
        backgroundColor: 'red'
    },
    right: {
        flex: 1,
        justifyContent: 'space-around'
    },
    img: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    title: {
        color: COLOR_ROOT.BLACK,
        fontSize: 16,
        fontWeight: '500'
    },
    subTitle: {
        color: COLOR_ROOT.LIGHT_GRAY,
        fontSize: 15,
        fontWeight: '400'
    },
    boxPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    price: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    time: {
        color: COLOR_ROOT.MAIN_COLOR,
        fontSize: 15,
        fontWeight: '500'
    },
    textTotal: {
        color: COLOR_ROOT.MAIN_COLOR,
        fontSize: 17,
        fontWeight: '500'
    },
    textByn: {
        color: COLOR_ROOT.MAIN_COLOR,
        fontSize: 14,
        fontWeight: '500',
        textTransform: 'uppercase'
    },
    order: {

    },
    textOrder: {
        backgroundColor: COLOR_ROOT.PINK,
        color: 'white',
        fontSize: 13,
        paddingHorizontal: 12,
        paddingVertical: 3,
        borderRadius: 15,
        fontWeight: '500',
        textTransform: 'uppercase'
    }
});


export default ServiceCart;