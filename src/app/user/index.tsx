import { Text, StyleSheet, Pressable, Platform } from 'react-native';
import React, { FC, useRef } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import WrapperScrollMenu from '@/components/wrappers/WrapperScrollMenu/WrapperScrollMenu';
import HomeUserHeader from '@/components/widgets/HomeUserHeader/HomeUserHeader';
import ListDepartment from '@/components/widgets/ListDepartment/ListDepartment';
import ListMasters from '@/components/widgets/ListMasters/ListMasters';
import ListService from '@/components/widgets/ListService/ListService';

import BottomModalSheet from '@/components/wrappers/BottomModalSheet/BottomModalSheet';
import { IRefBottomModalSheet } from '@/components/wrappers/BottomModalSheet/types';

/** 
 * @page Главная страница Clien приложения после регистрации.
 */
const HomeUser: FC = () => {

    const refModal = useRef<IRefBottomModalSheet>(null);

    const press = () => {
        refModal.current?.openModal();
    }

    return (
        <WrapperScrollMenu >
            <HomeUserHeader/>

            <Pressable
                onPress={() => press()}
            >
                <Text 
                    style={{fontSize: 20, textAlign: 'center', backgroundColor: 'green', marginTop: 20, color: '#fff', paddingVertical: 5}} 
                >
                    кнопка для теста
                </Text>
            </Pressable>

            <Text style={[styles.text, {marginTop: 10}]} >Service</Text>
            <ListDepartment/>
            <Text style={[styles.text, {marginTop: 10}]} >Masters</Text>
            <ListMasters/>
            <Text style={[styles.text, {marginTop: 0}]} >Популярные услуги</Text>
            <ListService/>

            <BottomModalSheet ref={refModal}>
                <Text style={{fontSize: 30}}>Home</Text>
            </BottomModalSheet>

        </WrapperScrollMenu>
    );
};


const styles = StyleSheet.create({
    main: { flex: 1 },
    box: { },
    text: {
        fontSize: 15,
        color: COLOR_ROOT.ORANGE,
        fontWeight: '500',
        marginLeft: 10
    }
});


export default HomeUser;