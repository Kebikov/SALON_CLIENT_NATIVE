import { View, Text, StyleSheet, Image, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import React, { FC, useState } from 'react';
import QuestionHOC from '@/components/wrappers/QuestionHOC/QuestionHOC';
import Title from '@/components/shared/Title/Title';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';
import MenuItem from '@/components/shared/MenuItem/MenuItem';
import type { IDataDepartment } from '@/pages/AdminAddGroupDepartment/AdminAddGroupDepartment';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import type { TypeRootPage } from '@/navigation/navigation.types';
import { COLOR_ROOT } from '@/data/colors';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import { baseLink } from '@/api/axios/axios.instance/instance';


interface IDepartmentForm {
    choice: string;
    titleForButton?: string;
    handlePressButton: (data: Omit<IDataDepartment, 'icon'>) => void;
}


/**
 * @shared `Форма добавления группы.`
 * @param choice Выбранная иконка для группы.
 * @param titleForButton ? Текст кнопки.
 * @param handlePressButton Функция обрабатываюшяя нажатие на кнопку.
 * @example 
 */
const DepartmentForm: FC<IDepartmentForm> = ({choice, titleForButton = 'добавить', handlePressButton}) => {

    const [data, setData] = useState<Omit<IDataDepartment, 'icon'>>({
        name: '', 
        discription: ''
    });

    const onChangeForm = (e: NativeSyntheticEvent<TextInputChangeEventData>, key: string) => {
        setData( state => ({...state, [key]: e.nativeEvent.text}) );
    }

    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>();

    return (
        <>
            <QuestionHOC
                    title='Группа'
                    discription='Напишите краткое название группы, данное название будет показано клиенту для выбора отдела услуг, например: причёска, маникюр, массаж и т.д.'
                    marginTop={10}
                >
                    <Title text='Группа' location='left'/>
                </QuestionHOC>
                <InputGeneric
                    keyName='name'
                    placeholder='Имя группы'
                    img={require('@/source/img/icon/group-gray.png')}
                    onChangeForm={onChangeForm}
                />
                <QuestionHOC
                    title='Описание'
                    discription='Напишите краткое описание добавляемой группы.'
                    marginTop={10}
                >
                    <Title text='Описание' location='left'/>
                </QuestionHOC>
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
                    title={titleForButton}
                    img={require('@/source/img/icon/group-gray.png')}
                    pushButton={() => handlePressButton(data)}
                    marginTop={10}
                />
        </>
    );
};

const styles = StyleSheet.create({

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

export default DepartmentForm;