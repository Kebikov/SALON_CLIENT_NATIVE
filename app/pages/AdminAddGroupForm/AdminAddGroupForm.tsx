import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import type { TypeRootPage } from '@/navigation/navigation.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR_ROOT } from '@/data/colors';
import WrapperScrollMenu from '@/components/wrappers/WrapperScrollMenu/WrapperScrollMenu';
import HeaderTitle from '@/components/widgets/HeaderTitle/HeaderTitle';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';
import type { TPageAdminAddGroupForm } from '@/navigation/navigation.types';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import MenuItem from '@/components/shared/MenuItem/MenuItem';
import Discription from '@/components/shared/Discription/Discription';

/**
 * @page Страница пользователя.
 */
const AdminAddGroupForm: FC<TPageAdminAddGroupForm> = ({route}) => {

    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>();

    const choice = route.params.choice;

    return (
        <WrapperScrollMenu page='AdminAddGroupForm' >
            <HeaderTitle text='Добавление группы' />
            <View style={styles.main} >
                <Discription text='Напишите краткое название группы, например: причёска, маникюр, массаж и т.д.' marginTop={10} />
                <InputGeneric
                    keyName='group'
                    placeholder='Имя группы'
                    img={require('@/source/img/icon/group-gray.png')}
                    onChangeForm={() => {}}
                />
                <Discription text='Напишите краткое описание добавляемой группы.' marginTop={10} />
                <InputGeneric
                    keyName='discription'
                    placeholder='Описание для группы.'
                    img={require('@/source/img/icon/write.png')}
                    onChangeForm={() => {}}
                    lines={2}
                />
                <MenuItem
                    title='Выбор иконки'
                    subTitle='иконка для отображения группы'
                    img={require('@/source/img/icon/choice.png')}
                    pushFunction={() => navigate('SelectIcon', {choice: 'icon-group'})}
                    marginTop={10}
                />
                <ButtonWithIcon
                    title='добавить'
                    img={require('@/source/img/icon/group-gray.png')}
                    pushButton={() => {}}
                    marginTop={10}
                />
                <Text>{choice}</Text>
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

export default AdminAddGroupForm;