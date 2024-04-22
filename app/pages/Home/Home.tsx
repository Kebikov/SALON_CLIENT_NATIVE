import { Text, StyleSheet, Pressable, ToastAndroid } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import WrapperScrollMenu from '@/shared/WrapperScrollMenu/WrapperScrollMenu';
import HomeUserHeader from '@/widgets/HomeUserHeader/HomeUserHeader';
import ListDepartment from '@/widgets/ListDepartment/ListDepartment';
import ListMasters from '@/widgets/ListMasters/ListMasters';
import ListService from '@/widgets/ListService/ListService';
import { checkErrorResponce } from '@/axios/helpers/checkErrorResponce';
import httpClientService from '@/axios/routes/client/service/http.client.service';



/** 
 * @page Главная страница приложения.
 */
const Home: FC = () => {

    const press = async () => {
        const clientInfo = await httpClientService.GET_getClientInfo(1);
        if(checkErrorResponce(clientInfo)) return;
        console.log('clientInfo >>> ', clientInfo);
    }

    return (
        <WrapperScrollMenu page='Home' >
            <HomeUserHeader/>

            <Pressable
                onPress={() => press()}
            >
                <Text style={{fontSize: 20}} >НАЖМИ МЕНЯ</Text>
            </Pressable>

            <Text style={[styles.text, {marginTop: 10}]} >Service</Text>
            <ListDepartment/>
            <Text style={[styles.text, {marginTop: 10}]} >Masters</Text>
            <ListMasters/>
            <Text style={[styles.text, {marginTop: 0}]} >Популярные услуги</Text>
            <ListService/>
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