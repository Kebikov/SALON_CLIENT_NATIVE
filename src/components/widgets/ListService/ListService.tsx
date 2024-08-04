import { View, Text, StyleSheet } from 'react-native';
import React, { FC, useEffect, useState, useRef } from 'react';
import { IServiceCart } from '@/components/shared/ServiceCart/ServiceCart';
import ServiceCart from '@/components/shared/ServiceCart/ServiceCart';
import type { ServiceDTOAndDepartmentName } from '@/api/routes/service/types/service.types';


const DATA: Array<ServiceDTOAndDepartmentName> = [
    {
        id: 1,
        title: 'Макияж свадебный',
        description: '',
        time: 40,
        price: 45,
        img: require('@/source/img/service-img/3.jpg'),
        name: 'макияж и укладка',
    },
    {
        id: 2,
        title: 'Стрижка женская',
        description: '',
        time: 45,
        price: 55,
        img: require('@/source/img/service-img/1.jpg'),
        name: 'парикмахерские услуги',
    },
    {
        id: 3,
        title: 'Эпиляция зоны',
        description: '',
        time: 30,
        price: 35,
        img: require('@/source/img/service-img/2.jpg'),
        name: 'эпиляция',
    },
    {
        id: 4,
        title: 'Окрашивание простое',
        description: '',
        time: 120,
        price: 85,
        img: require('@/source/img/service-img/4.jpg'),
        name: 'парикмахерские услуги',
    },
]

/** 
 * @widgets Горизонтальный скрол с услугами.
 */
const ListService: FC = () => {

    const [data, setData] = useState<ServiceDTOAndDepartmentName[]>(DATA);

    const items = data.map(item => <ServiceCart key={item.id} service={item} />);


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
        padding: 10,
        gap: 10
    }
});

export default ListService;