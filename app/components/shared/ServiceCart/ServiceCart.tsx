import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';


export interface IServiceCart {
    id: string;
    /**
     * Название услуги.
     */
    title: string;
    /**
     * Отдел к которому относится услуга
     */
    department: string;
    /**
     * Время выполнения услуги.
     */
    time: number;
    /**
     * Стоимость услуги.
     */
    price: number;
    /**
     * Изображение услуги.
     */
    img: number;
}


/**
 * @shared Мини карточка услуги.
 * @param title Название услуги.
 * @param department Отдел к которому относится услуга.
 * @param time Время выполнения услуги.
 * @param price Стоимость услуги.
 * @param img Изображение услуги.
 */
const ServiceCart: FC<IServiceCart> = ({title, department, time, price, img}) => {

    return (
        <View style={styles.main} >
            <View style={styles.box} >
                <View style={styles.left} >
                    <Image style={styles.img} source={img} />
                </View>
                <View style={styles.right} >
                    <Text style={styles.title} >{title}</Text>
                    <Text style={styles.department} >{department}</Text>
                    <Text style={styles.time} >{'Время: ' + time + 'мин.'}</Text>
                    <View style={styles.boxPrice} >
                        <View style={styles.price}>
                            <Text style={styles.textTotal}>{price}</Text>
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
        fontSize: Platform.OS === 'ios' ? 18 : 16,
        fontWeight: '500'
    },
    department: {
        color: COLOR_ROOT.LIGHT_ICON,
        fontSize: Platform.OS === 'ios' ? 16 : 15,
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
        fontSize: Platform.OS === 'ios' ? 16 : 15,
        fontWeight: '500'
    },
    textTotal: {
        color: COLOR_ROOT.MAIN_COLOR,
        fontSize: 17,
        fontWeight: '500'
    },
    textByn: {
        color: COLOR_ROOT.MAIN_COLOR,
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        fontWeight: '500',
        textTransform: 'uppercase'
    },
    order: {
        backgroundColor: COLOR_ROOT.PINK,
        paddingHorizontal: 12,
        paddingVertical: Platform.OS === 'ios' ? 5 : 3,
        borderRadius: 15,
    },
    textOrder: {
        color: 'white',
        fontSize: Platform.OS === 'ios' ? 14 : 13,
        fontWeight: '500',
        textTransform: 'uppercase'
    }
});


export default ServiceCart;