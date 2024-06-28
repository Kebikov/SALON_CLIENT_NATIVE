import { View, Text, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, Button, Pressable, Platform, Alert, Image } from 'react-native';
import React, { FC, useState, useRef } from 'react';
import WrapperScrollMenu from '@/components/wrappers/WrapperScrollMenu/WrapperScrollMenu';
import QuestionHOC from '@/components/wrappers/QuestionHOC/QuestionHOC';
import Title from '@/components/shared/Title/Title';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';
import * as ImagePicker from 'expo-image-picker';
import { IService } from '@/api/routes/service/types/service.types';
import BottomModalSheet from '@/components/wrappers/BottomModalSheet/BottomModalSheet';
import type { IRefBottomModalSheet } from '@/components/wrappers/BottomModalSheet/types';
import { useHookGetDataDepartments } from '@/hooks/useHookGetDataDepartments';
import { COLOR_ROOT } from '@/data/colors';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import Discription from '@/components/shared/Discription/Discription';
import { useHookCheckErrorResponce } from '@/hooks/useHookCheckErrorResponce';
import { pickImageAsync } from '@/helpers/helpersForComponents/adminAddService/pickImageAsync';
import { sendData } from '@/helpers/helpersForComponents/adminAddService/sendData';

const sizeTitle = 16;

/**
 * @page `Страница для добавления услуги.`
 */
const AdminAddService: FC = () => { 

    const {modalMessageError} = useHookCheckErrorResponce();
    
    /**
     * @param selectedImage Выбраное изображение.
     */
    const [selectedImage, setSelectedImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
    /**
     * @param nameSelectedDepatment Имя выбранной группы.
     */
    const [nameSelectedDepatment, setNameSelectedDepatment] = useState<string>('');

    const [data, setData] = useState< Omit<IService, 'img'> >({ 
        title: '',
        description: '',
        price: 0,
        time: 0,
        id_department: 0
    });

    const {dataDepartments} = useHookGetDataDepartments();

    const bottomSheetRef = useRef<IRefBottomModalSheet>(null);
    const openList = () => bottomSheetRef.current?.openModal();
    const closeList = () => bottomSheetRef.current?.closeModal();
    /**
     * Изминение данных при заполнении формы.
     */
    const onChangeForm = (e: NativeSyntheticEvent<TextInputChangeEventData>, key: string) => {
        e.persist();
        setData( state => ({...state, [key]: e.nativeEvent.text}) );
    }
    /**
     * Выбор группы.
     */
    const choiceDepartment = (id: number, name: string) => {
        setData( state => ({...state, id_department: id}) );
        setNameSelectedDepatment(name);
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
                            title='Описание'
                            discription='Введите описание услуги, это быдет видеть клиент, если нажмет подробнее об услуге.'
                            marginTop={10}
                        >
                            <Title text='Описание' location='left' fontSize={sizeTitle} />
                        </QuestionHOC>
                        <InputGeneric<IService>
                            keyName='description'
                            placeholder='Название услуги'
                            img={require('@/source/img/icon/group-gray.png')}
                            onChangeForm={onChangeForm}
                            value={data.description}
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
                    {/*//* Выбор фото */}
                    <Pressable
                        onPress={() => pickImageAsync(setSelectedImage, modalMessageError)}
                        style={[styles.button, {marginTop: 20}]}
                    >
                        <Text style={[styles.buttonText, {fontSize: Platform.OS === 'ios' ? 15 : 13}]} >Выбор фото</Text>
                        {
                        selectedImage
                        ?
                        <View style={{width: '100%', marginTop: 5, alignItems: 'center'}} >
                            <View style={{width: 70, height: 70, overflow: 'hidden', borderRadius: 10}} >
                                <Image source={{uri: selectedImage.uri}} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
                            </View>
                        </View>
                        :
                        null
                    }
                    </Pressable>
                    <Discription text='Размер до 2 MB., формат : jpg / jpeg / png' position='center' marginTop={5} />
                    {/*//* Выбор группы */}
                    <Pressable 
                        onPress={openList}
                        style={styles.button}
                    >
                        <Text style={[styles.buttonText, {fontSize: Platform.OS === 'ios' ? 15 : 13}]} >Выбор группы</Text>
                        {
                            nameSelectedDepatment 
                            ?
                            <Text style={[styles.buttonText, {fontSize: Platform.OS === 'ios' ? 12 : 11}]} >{nameSelectedDepatment}</Text>
                            :
                            null
                        }
                    </Pressable>
                    <View style={{flex: 1, justifyContent: 'flex-end', paddingVertical: 10}}>
                        <ButtonWithIcon title='добавить' pushButton={() => sendData(selectedImage, data, modalMessageError)} img={require('@/source/img/icon/plus-white.png')}/>
                    </View>
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
                                    onPress={() => choiceDepartment(item.id, item.name)}
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
        marginTop: 10, 
        backgroundColor: COLOR_ROOT.GRAY,
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