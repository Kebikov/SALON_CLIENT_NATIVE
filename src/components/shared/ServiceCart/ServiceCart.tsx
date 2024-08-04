import { View, Text, StyleSheet, Image, Platform, Pressable } from 'react-native';
import React, { FC, useState } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import { baseLink } from '@/api/axios/axios.instance/instance';
import { ServiceDTOAndDepartmentName } from '@/api/routes/service/types/service.types';


export interface IServiceCart {
    service: ServiceDTOAndDepartmentName;
    borderRadius?: number;
    isShowButton?: boolean;
    handlePressButton?: Function;
    textButton?: string;
    backgroundColorButton?: string;
}


/**
 * @shared Мини карточка услуги.
 * @param service ServiceDTO.
 * @optional
 * @param borderRadius ? Радиус закругления.
 * @param isShowButton ? Показывать ли кнопку в правом, нижнем углу.
 * @param handlePressButton ? Обработка нажатия кнопки в правом, нижнем углу.
 * @param textButton ? Текст кнопки.
 * @param backgroundColorButton ? Цвет кнопки.
 */
const ServiceCart: FC<IServiceCart> = ({
    service, 
    borderRadius = 25,
    isShowButton = true,
    handlePressButton = () => {},
    textButton = 'запись',
    backgroundColorButton = COLOR_ROOT.PINK
}) => {

    const [cartState, setCartState] = useState();

    return (
        <View style={styles.main} >
            <View style={[styles.box, {borderRadius}]} >
                <View style={styles.left} >
                    <Image 
                        defaultSource={require('@/source/img/plug/plug.jpg')}
                        style={styles.img} 
                        source={typeof service.img === 'number' ? service.img : {uri: `${baseLink}/api/img/get-img/${service.img}?type=img_imgService`}}
                    />
                </View>
                <View style={styles.right} >
                    <Text style={styles.title} >{service.title}</Text>
                    <Text style={styles.department} >{service.department_name}</Text>
                    <Text style={styles.time} >{'Время: ' + service.time + 'мин.'}</Text>
                    <View style={styles.boxPrice} >
                        <View style={styles.price}>
                            <Text style={styles.textTotal}>{service.price}</Text>
                            <Text style={styles.textByn} > byn</Text>
                        </View>
                        {
                            isShowButton
                            ?
                            <Pressable 
                                style={[styles.order, { backgroundColor: backgroundColorButton}]}
                                onPress={() => handlePressButton()}
                            >
                                <Text style={styles.textOrder}>{textButton}</Text>
                            </Pressable>
                            :
                            null
                        }
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
        justifyContent:'center'
    },
    box: {
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-start',
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
        width: Platform.OS === 'ios' ? 95 : 90,
        height: Platform.OS === 'ios' ? 95 : 90,
        borderRadius:15,
        overflow: 'hidden',
        marginRight: 10
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
        fontSize: Platform.OS === 'ios' ? 17 : 15,
        fontWeight: '500',
    },
    department: {
        color: COLOR_ROOT.LIGHT_ICON,
        fontSize: Platform.OS === 'ios' ? 14 : 13,
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
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        fontWeight: Platform.OS === 'ios' ? '600' : '500'
    },
    textTotal: {
        color: COLOR_ROOT.MAIN_COLOR,
        fontSize: Platform.OS === 'ios' ? 17 : 15,
        fontWeight: Platform.OS === 'ios' ? '600' : '500'
    },
    textByn: {
        color: COLOR_ROOT.MAIN_COLOR,
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        fontWeight: Platform.OS === 'ios' ? '600' : '500',
        textTransform: 'uppercase'
    },
    order: {
        paddingHorizontal: 12,
        paddingVertical: Platform.OS === 'ios' ? 5 : 3,
        borderRadius: 15,
    },
    textOrder: {
        color: 'white',
        fontSize: Platform.OS === 'ios' ? 14 : 12,
        fontWeight: '500',
        textTransform: 'uppercase'
    }
});


export default ServiceCart;