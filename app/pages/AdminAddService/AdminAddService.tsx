import { View, Text, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import React, { FC, useState } from 'react';
import WrapperScrollMenu from '../../components/wrappers/WrapperScrollMenu/WrapperScrollMenu';
import QuestionHOC from '../../components/wrappers/QuestionHOC/QuestionHOC';
import Title from '../../components/shared/Title/Title';
import InputGeneric from '../../components/shared/InputGeneric/InputGeneric';


/**
 * @page `Страница для добавления услуги.`
 */
const AdminAddService: FC = () => { 

    // const [data, setData] = useState<IDataDepartment>({ 
    //     name: initialData.name, 
    //     discription: initialData.discription,
    //     icon: initialData.icon
    // });

    // const onChangeForm = (e: NativeSyntheticEvent<TextInputChangeEventData>, key: string) => {
    //     e.persist();
    //     setData( state => ({...state, [key]: e.nativeEvent.text}) );
    // }

    return (
        <WrapperScrollMenu page='AdminAddService' titlePage='Добавление услуги' >
            <View style={styles.main} >
                <QuestionHOC
                    title='Название'
                    discription='Введите название услуги, например: маникюр ручной, стрижка женикая, окрашевание волос и т.д.'
                    marginTop={10}
                >
                    <Title text='Название' location='left'/>
                </QuestionHOC>
                {/* <InputGeneric
                    keyName='title'
                    placeholder='Название услуги'
                    img={require('@/source/img/icon/group-gray.png')}
                    onChangeForm={onChangeForm}
                    value={data.name}
                /> */}
            </View>
        </WrapperScrollMenu>
    );
};

const styles = StyleSheet.create({
    main: {flex: 1, paddingHorizontal: 10},
});

export default AdminAddService;