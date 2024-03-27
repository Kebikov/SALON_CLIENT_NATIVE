import { View, Text, StyleSheet, FlatList, RefreshControl, Button } from 'react-native';
import React, { FC, useEffect, useState, useRef } from 'react';
import ServiceItem from '@/shared/ServiceItem/ServiceItem';
import NotElements from '@/shared/NotElements/NotElements';



interface IDataListService {
    id: string;
    /**
     * Название услуги.
     */
    title: string;
    /**
     * Изображение услуги.
     */
    img: number;
}

const DATA: Array<IDataListService> = [
    {
        id: '1',
        title: 'Маникюр',
        img: require('@/source/img/icon/1.png')
    },
    {
        id: '2',
        title: 'Прическа',
        img: require('@/source/img/icon/2.png')
    },
    {
        id: '3',
        title: 'Эпиляция',
        img: require('@/source/img/icon/3.png')
    },
    {
        id: '4',
        title: 'Массаж',
        img: require('@/source/img/icon/4.png')
    },
    {
        id: '5',
        title: 'Массаж',
        img: require('@/source/img/icon/5.png')
    }
]

/** 
 * @widgets Горизонтальный скрол с услугами.
 */
const ListService: FC = () => {

    const [data, setData] = useState<IDataListService[]>(DATA);


    return (
        <View style={styles.main}>
            <FlatList
                data={data}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                contentContainerStyle={{ justifyContent: 'center', height: 100, flexGrow: 1 }}
                renderItem={({item}) => <ServiceItem title={item.title} img={item.img}/>}
                ListEmptyComponent={<NotElements title='Нет услуг.'/>}
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