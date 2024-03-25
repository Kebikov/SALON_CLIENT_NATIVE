import { View, Text, StyleSheet, FlatList, RefreshControl, Button } from 'react-native';
import React, { FC, useEffect, useState, useRef } from 'react';
import ServiceItem from '@/shared/ServiceItem/ServiceItem';

const DATA = [
    {
        id: '1',
        title: 'Маникюр',
        img: require('@/source/img/img-service/1.png')
    },
    {
        id: '2',
        title: 'Прическа',
        img: require('@/source/img/img-service/2.png')
    },
    {
        id: '3',
        title: 'Эпиляция',
        img: require('@/source/img/img-service/3.png')
    },
    {
        id: '4',
        title: 'Массаж',
        img: require('@/source/img/img-service/4.png')
    },
    {
        id: '5',
        title: 'Массаж',
        img: require('@/source/img/img-service/5.png')
    }
]


/** 
 * @widgets Горизонтальный скрол с услугами.
 */
const ListService: FC = () => {

    const [data, setData] = useState(DATA);


    return (
        <View style={styles.main}>
            <FlatList
                data={data}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                contentContainerStyle={{ justifyContent: 'center', height: 100, flexGrow: 1 }}
                renderItem={({item}) => <ServiceItem title={item.title} img={item.img}/>}
                ListEmptyComponent={<View><Text>Нет элементов.</Text></View>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        marginTop: 10,
        //backgroundColor: 'red',
        height: 100
    }
});

export default ListService;