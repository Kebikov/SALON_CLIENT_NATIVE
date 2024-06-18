import { View, Text, StyleSheet } from 'react-native';
import React, { FC, useEffect, useState, useRef } from 'react';
import { IServiceCart } from '@/components/shared/ServiceCart/ServiceCart';
import ServiceCart from '@/components/shared/ServiceCart/ServiceCart';


const DATA: Array<IServiceCart> = [
    {
        id: '1',
        title: 'Макияж свадебный',
        department: 'макияж и укладка',
        time: 40,
        price: 45,
        img: require('@/source/img/service-img/3.jpg')
    },
    {
        id: '2',
        title: 'Стрижка женская',
        department: 'парикмахерские услуги',
        time: 45,
        price: 55,
        img: require('@/source/img/service-img/1.jpg')
    },
    {
        id: '3',
        title: 'Эпиляция зоны',
        department: 'эпиляция',
        time: 30,
        price: 35,
        img: require('@/source/img/service-img/2.jpg')
    },
    {
        id: '4',
        title: 'Окрашивание простое',
        department: 'парикмахерские услуги',
        time: 120,
        price: 85,
        img: require('@/source/img/service-img/4.jpg')
    },
]

/** 
 * @widgets Горизонтальный скрол с услугами.
 */
const ListService: FC = () => {

    const [data, setData] = useState<IServiceCart[]>(DATA);

    const items = data.map(item => <ServiceCart key={item.id} id={item.id} title={item.title} department={item.department} time={item.time} price={item.price} img={item.img} /> );


    return (
        <View style={styles.main}>
            {items}
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        //marginTop: 10,
        //backgroundColor: 'red',
        paddingBottom: 10
    }
});

export default ListService;