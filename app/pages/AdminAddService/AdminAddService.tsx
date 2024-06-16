import { View, Text, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, Button } from 'react-native';
import React, { FC, useState } from 'react';
import WrapperScrollMenu from '../../components/wrappers/WrapperScrollMenu/WrapperScrollMenu';
import QuestionHOC from '../../components/wrappers/QuestionHOC/QuestionHOC';
import Title from '../../components/shared/Title/Title';
import InputGeneric from '../../components/shared/InputGeneric/InputGeneric';
import * as ImagePicker from 'expo-image-picker';
import { IService } from '../../api/routes/service/types/service.types';


/**
 * @page `Страница для добавления услуги.`
 */
const AdminAddService: FC = () => { 
    /**
     * @param selectedImage Выбраное изображение.
     */
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    
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

    const [data, setData] = useState<IService>({ 
        title: '',
        description: '',
        price: 0,
        time: 0,
        img: '',
        id_department: 0
    });

    const onChangeForm = (e: NativeSyntheticEvent<TextInputChangeEventData>, key: string) => {
        e.persist();
        setData( state => ({...state, [key]: e.nativeEvent.text}) );
    }

    return (
        <WrapperScrollMenu page='AdminAddService' titlePage='Добавление услуги' >
            <View style={styles.main} >
            {/* <Button title='Выбор изображения' onPress={pickImageAsync} /> */}
                {/*//* title */}
                <> 
                    <QuestionHOC
                        title='Название'
                        discription='Введите название услуги, например: маникюр ручной, стрижка женикая, окрашевание волос и т.д.'
                        marginTop={10}
                    >
                        <Title text='Название' location='left'/>
                    </QuestionHOC>
                    <InputGeneric
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
                        <Title text='Название' location='left'/>
                    </QuestionHOC>
                    <InputGeneric
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
                        <Title text='Стоимость' location='left' />
                    </QuestionHOC>
                    <InputGeneric
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
                        <Title text='Длительность услуги' location='left' />
                    </QuestionHOC>
                    <InputGeneric
                        keyName='time'
                        placeholder='Длительность в минутах'
                        img={require('@/source/img/icon/group-gray.png')}
                        onChangeForm={onChangeForm}
                        value={ data.time ? String(data.time) : '' }
                        keyboardType='numeric'
                    />
                </>

            </View>
        </WrapperScrollMenu>
    );
};

const styles = StyleSheet.create({
    main: {flex: 1, paddingHorizontal: 10},
});

export default AdminAddService;