import { View, Text, StyleSheet, FlatList, RefreshControl, Button, Platform } from 'react-native';
import React, { FC, useEffect, useState, useRef } from 'react';
import MasterCart from '@/components/shared/MasterCart/MasterCart';
import NotElements from '@/components/shared/NotElements/NotElements';



interface IDATAitem {
    id: string;
    masterName: string;
    masterUnit: string;
    grade: number;
    img: number;
}

const DATA: Array<IDATAitem> = [
    {
        id: '1',
        masterName: 'Мария К.',
        masterUnit: 'маникюр',
        grade: 4.7,
        img: require('@/source/img/masters/1.jpg')
    },
    {
        id: '2',
        masterName: 'Мария К.',
        masterUnit: 'маникюр',
        grade: 4.8,
        img: require('@/source/img/masters/2.jpg')
    },
    {
        id: '3',
        masterName: 'Мария К.',
        masterUnit: 'маникюр',
        grade: 4.9,
        img: require('@/source/img/masters/3.jpg')
    },
    {
        id: '4',
        masterName: 'Мария К.',
        masterUnit: 'маникюр',
        grade: 3.7,
        img: require('@/source/img/masters/4.jpg')
    },
    {
        id: '5',
        masterName: 'Мария К.',
        masterUnit: 'маникюр',
        grade: 4.7,
        img: require('@/source/img/masters/1.jpg')
    },
    {
        id: '6',
        masterName: 'Мария К.',
        masterUnit: 'маникюр',
        grade: 4.8,
        img: require('@/source/img/masters/2.jpg')
    },
    {
        id: '7',
        masterName: 'Мария К.',
        masterUnit: 'маникюр',
        grade: 4.9,
        img: require('@/source/img/masters/3.jpg')
    },
    {
        id: '8',
        masterName: 'Мария К.',
        masterUnit: 'маникюр',
        grade: 3.7,
        img: require('@/source/img/masters/4.jpg')
    }
]

const sizeGap = 14;
const sizeHeight = 192;

/** 
 * @widgets Горизонтальный скрол с карточками мастеров.
 */
const ListMasters: FC = () => {

    const widthMaster = Platform.OS === 'ios' ? 145 : 135;

    let delay = 1;

    return (
        <View style={styles.main}>
            <FlatList
                // contentContainerStyle={{ justifyContent: 'center', height: sizeHeight, flexGrow: 1, gap: sizeGap, paddingHorizontal: sizeGap}}
                contentContainerStyle={{height: sizeHeight, flexGrow: 1}}
                
                data={DATA}
                renderItem={({item}) => 
                    <MasterCart 
                        masterName={item.masterName} 
                        masterUnit={item.masterUnit} 
                        img={item.img} 
                        grade={item.grade}
                        width={widthMaster}
                    />
                }
                keyExtractor={item => item.id}

                horizontal={true}
                showsHorizontalScrollIndicator={false}

                pagingEnabled
                snapToAlignment='center'
                decelerationRate={'fast'}
                initialScrollIndex={1}
                getItemLayout={(data, index) => (
                    { length: widthMaster, offset: widthMaster * index, index }
                )}
                

                ListEmptyComponent={<NotElements title='Нет мастеров.'/>}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    main: {
        marginTop: 10,
        height: sizeHeight
    }
});


export default ListMasters;