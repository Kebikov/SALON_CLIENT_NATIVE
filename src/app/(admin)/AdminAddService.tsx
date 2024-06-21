import { View, Text, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, Button, Pressable, Platform } from 'react-native';
import React, { FC, useState, useRef } from 'react';
import WrapperScrollMenu from '../../components/wrappers/WrapperScrollMenu/WrapperScrollMenu';
import QuestionHOC from '../../components/wrappers/QuestionHOC/QuestionHOC';
import Title from '../../components/shared/Title/Title';
import InputGeneric from '../../components/shared/InputGeneric/InputGeneric';
import * as ImagePicker from '../../../node_modules/expo-image-picker';
import { IService } from '../../api/routes/service/types/service.types';
import BottomModalSheet from '../../components/wrappers/BottomModalSheet/BottomModalSheet';
import type { IRefBottomModalSheet } from '../../components/wrappers/BottomModalSheet/types';
import { useHookGetDataDepartments } from '../../hooks/useHookGetDataDepartments';
import { COLOR_ROOT } from '../../data/colors';

const sizeTitle = 16;

/**
 * @page `Страница для добавления услуги.`
 */
const AdminAddService: FC = () => { 
    /**
     * @param selectedImage Выбраное изображение.
     */
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const [data, setData] = useState<IService>({ 
        title: '',
        description: '',
        price: 0,
        time: 0,
        img: '',
        id_department: 0
    });
    console.log(data);

    const {dataDepartments} = useHookGetDataDepartments();

    const bottomSheetRef = useRef<IRefBottomModalSheet>(null);
    const openList = () => bottomSheetRef.current?.openModal();
    const closeList = () => bottomSheetRef.current?.closeModal();

    
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            aspect: [1, 1]
        });
    
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };



    const onChangeForm = (e: NativeSyntheticEvent<TextInputChangeEventData>, key: string) => {
        e.persist();
        setData( state => ({...state, [key]: e.nativeEvent.text}) );
    }

    const choiceDepartment = (id: number) => {
        setData( state => ({...state, id_department: id}) );
        closeList();
    }
    
    return (
        <>
            <WrapperScrollMenu titlePage='Добавление услуги' >
                <View style={styles.main} >
                    {/*//* title */}
                    <> 
                        <QuestionHOC
                            title='Название'
                            discription='Введите название услуги, например: маникюр ручной, стрижка женикая, окрашевание волос и т.д.'
                            marginTop={10}
                        >
                            <Title text='Название' location='left' fontSize={sizeTitle} />
                        </QuestionHOC>
                        <InputGeneric<IService>
                            keyName='title'
                            placeholder='Название услуги'
                            img={require('@/source/img/icon/group-gray.png')}
                            onChangeForm={onChangeForm}
                            value={data.title}
                        />
                    </>
                    {/*//* description */}
                    <> 
                        <QuestionHOC
                            title='Название'
                            discription='Введите название услуги, например: маникюр ручной, стрижка женикая, окрашевание волос и т.д.'
                            marginTop={10}
                        >
                            <Title text='Название' location='left' fontSize={sizeTitle} />
                        </QuestionHOC>
                        <InputGeneric<IService>
                            keyName='description'
                            placeholder='Название услуги'
                            img={require('@/source/img/icon/group-gray.png')}
                            onChangeForm={onChangeForm}
                            value={data.title}
                        />
                    </>
                    {/*//* price */}
                    <> 
                        <QuestionHOC
                            title='Стоимость'
                            discription='Введите стоимость услуги, например: 45, будет установлено 45 рублей.'
                            marginTop={10}
                        >
                            <Title text='Стоимость' location='left' fontSize={sizeTitle} />
                        </QuestionHOC>
                        <InputGeneric<IService>
                            keyName='price'
                            placeholder='Стоимость услуги'
                            img={require('@/source/img/icon/group-gray.png')}
                            onChangeForm={onChangeForm}
                            value={ data.price ? String(data.price) : '' }
                            keyboardType='numeric'
                        />
                    </>
                    {/*//* time */}
                    <> 
                        <QuestionHOC
                            title='Длительность услуги'
                            discription='Установите длительность услуги в минутах.'
                            marginTop={10}
                        >
                            <Title text='Длительность услуги' location='left' fontSize={sizeTitle} />
                        </QuestionHOC>
                        <InputGeneric<IService>
                            keyName='time'
                            placeholder='Длительность в минутах'
                            img={require('@/source/img/icon/group-gray.png')}
                            onChangeForm={onChangeForm}
                            value={ data.time ? String(data.time) : '' }
                            keyboardType='numeric'
                        />
                    </>
                    
                    <Pressable 
                        onPress={openList}
                        style={styles.button}
                    >
                        <Text style={[styles.buttonText, {fontSize: Platform.OS === 'ios' ? 15 : 13}]} >Выбор группы</Text>
                        <Text style={[styles.buttonText, {fontSize: Platform.OS === 'ios' ? 12 : 11}]} >маникюр</Text>
                    </Pressable>

                </View>
            </WrapperScrollMenu>
            <BottomModalSheet ref={bottomSheetRef} heightProcent={50} >
                <>
                    {
                        dataDepartments.length > 0
                        ?
                        dataDepartments.map((item, i) => {
                            return (
                                <Pressable 
                                    onPress={() => choiceDepartment(item.id)}
                                    style={[styles.selectItem, i === 0 ? {borderTopWidth: 1} : null]} key={item.id} 
                                >
                                    <Text style={{fontSize: 16, paddingLeft: 10}} >{item.name}</Text>
                                </Pressable>
                            )
                        })
                        :
                        null
                    }
                </>
            </BottomModalSheet>
        </>
    );
};

const styles = StyleSheet.create({
    main: {flex: 1, paddingHorizontal: 10},
    selectItem: {
        width: '100%', 
        paddingVertical: 10,

        borderBottomWidth: 1, 
        borderColor: 'rgba(0,0,0,.15)'
    },
    button: {
        borderRadius: 10, 
        overflow: 'hidden', 
        marginTop: 20, 
        backgroundColor: COLOR_ROOT.MAIN_COLOR,
        paddingVertical: 10
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: '500',
    }
});

export default AdminAddService;