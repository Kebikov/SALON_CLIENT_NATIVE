import { View, Text, StyleSheet, Image, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import React, { FC, useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import type { TypeRootPage } from '@/navigation/navigation.types';
import WrapperScrollMenu from '@/components/wrappers/WrapperScrollMenu/WrapperScrollMenu';
import HeaderTitle from '@/components/widgets/HeaderTitle/HeaderTitle';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';
import type { TPageAdminAddDepartmentForm } from '@/navigation/navigation.types';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import MenuItem from '@/components/shared/MenuItem/MenuItem';
import Discription from '@/components/shared/Discription/Discription';
import { COLOR_ROOT } from '@/data/colors';
import { baseLink } from '@/api/axios/axios.instance/instance';


/** 
 * @table `Department - Таблица с группами.`
 * @param name - Имя группы.
 * @param discription - Описание группы.
 * @param icon - Иконка группы, например: "16.png"
 */
export interface IDataDepartment {
    name: string;
    discription: string;
    icon: string;
}


/**
 * @page Страница пользователя.
 */
const AdminAddDepartmentForm: FC<TPageAdminAddDepartmentForm> = ({route}) => {

    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>();
    const choice = route.params.choice;

    const [data, setData] = useState<Omit<IDataDepartment, 'icon'>>({
        name: '', 
        discription: ''
    });

    const onChangeForm = (e: NativeSyntheticEvent<TextInputChangeEventData>, key: string) => {
        setData( state => ({...state, [key]: e.nativeEvent.text}) );
    }

    return (
        <WrapperScrollMenu page='AdminAddDepartmentForm' >
            <HeaderTitle text='Добавление группы' />
            <View style={styles.main} >
                <Discription text='Напишите краткое название группы, например: причёска, маникюр, массаж и т.д.' marginTop={10} />
                <InputGeneric
                    keyName='name'
                    placeholder='Имя группы'
                    img={require('@/source/img/icon/group-gray.png')}
                    onChangeForm={onChangeForm}
                />
                <Discription text='Напишите краткое описание добавляемой группы.' marginTop={10} />
                <InputGeneric
                    keyName='discription'
                    placeholder='Описание для группы.'
                    img={require('@/source/img/icon/write.png')}
                    onChangeForm={onChangeForm}
                    lines={2}
                />
                <MenuItem
                    title='Выбор иконки'
                    subTitle='иконка для отображения группы'
                    img={require('@/source/img/icon/choice.png')}
                    pushFunction={() => navigate('SelectIcon')}
                    marginTop={10}
                />

                {
                    choice ?
                    <View style={styles.box} >
                        <View style={styles.item} >
                            <View style={[styles.boxImg, {borderColor: COLOR_ROOT.MAIN_COLOR}]} >
                                <Image source={{uri: `${baseLink}/api/img/get-img/${choice}?type=icon-group`}} style={styles.img} />
                            </View>
                        </View>
                    </View>
                    :
                    null
                }

                <ButtonWithIcon
                    title='добавить'
                    img={require('@/source/img/icon/group-gray.png')}
                    pushButton={() => {}}
                    marginTop={10}
                />
            </View>
        </WrapperScrollMenu>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: 10
    },
    item: {
        width: '25%',
        height: '100%',
        aspectRatio: 1 / 1,
        padding: 7
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    boxImg: {
        flex: 1,
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2
    },
    img: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%'
    },
});

export default AdminAddDepartmentForm;