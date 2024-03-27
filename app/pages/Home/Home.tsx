import { Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import WrapperScrollMenu from '@/shared/WrapperScrollMenu/WrapperScrollMenu';
import HomeUserHeader from '@/widgets/HomeUserHeader/HomeUserHeader';
import ListService from '@/widgets/ListService/ListService';
import ListMasters from '@/widgets/ListMasters/ListMasters';
import ServiceCart from '@/shared/ServiceCart/ServiceCart';




/** 
 * @page Главная страница приложения.
 */
const Home: FC = () => {

    return (
        <WrapperScrollMenu page='Home' >
            <HomeUserHeader/>
            <Text style={[styles.text, {marginTop: 10}]} >Service</Text>
            <ListService/>
            <Text style={[styles.text, {marginTop: 10}]} >Masters</Text>
            <ListMasters/>
            <Text style={[styles.text, {marginTop: 0}]} >Популярные услуги</Text>
            <ServiceCart/>
            <ServiceCart/>
            <ServiceCart/>
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
        fontSize: 15,
        color: COLOR_ROOT.ORANGE,
        fontWeight: '500',
        marginLeft: 10
    }
});


export default Home;