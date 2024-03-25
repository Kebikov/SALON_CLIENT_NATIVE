import { View, Text, StyleSheet, StatusBar, Image, Pressable } from 'react-native';
import React, { FC } from 'react';
import Wrapper from '@/shared/Wrapper/Wrapper';
import { COLOR_ROOT } from '@/data/colors';
import BottomMenu from '@/widgets/BottomMenu/BottomMenu';
import { ScrollView } from 'react-native-gesture-handler';
import WrapperScrollMenu from '@/shared/WrapperScrollMenu/WrapperScrollMenu';
import HomeUserHeader from '@/widgets/HomeUserHeader/HomeUserHeader';
import ServiceItem from '@/shared/ServiceItem/ServiceItem';
import ListService from '@/widgets/ListService/ListService';


/** 
 * @page Главная страница приложения.
 */
const Home: FC = () => {

    return (
        <WrapperScrollMenu page='Home' >
            <HomeUserHeader/>
            <Text style={styles.text} >Сервис</Text>
            <ListService/>
            <Text style={styles.text} >Мастера</Text>
        </WrapperScrollMenu>
    );
};


const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    box: {

    },
    text: {
        fontSize: 17,
        marginTop: 10,
        color: COLOR_ROOT.SECOND_COLOR,
        fontWeight: '500',
        marginLeft: 10
    }
});


export default Home;