import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React, { FC } from 'react';
import WrapperScrollMenu from '@/components/wrappers/WrapperScrollMenu/WrapperScrollMenu';
import { COLOR_ROOT } from '@/data/colors';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import Title from '@/components/shared/Title/Title';
import Discription from '@/components/shared/Discription/Discription';
import HeaderTitle from '@/components/widgets/HeaderTitle/HeaderTitle';


/**
 * @page Страница добавление групп услуг.
 */
const AdminAddGroup: FC = () => {

    return (
        <WrapperScrollMenu page='AdminAddGroup' >
            <HeaderTitle text='Группы услуг' />
            <View style={styles.main} >
                <Discription text='Работа с группами услуг. Для обьединения услуг в определенные группы.' marginTop={5}/>
                <ButtonWithIcon title='добавить группу' pushButton={() => {}} img={require('@/source/img/icon/plus-white.png')} marginTop={10} />
            </View>
        </WrapperScrollMenu>
    );
};


const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: 10
    }
});

export default AdminAddGroup;