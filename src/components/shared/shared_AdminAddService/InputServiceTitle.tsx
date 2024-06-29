import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';

import QuestionHOC from '@/components/wrappers/QuestionHOC/QuestionHOC';
import Title from '@/components/shared/Title/Title';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';
import type { IService } from '@/api/routes/service/types/service.types';
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';


export interface IInputService {
    sizeTitle: number;
    onChangeForm: (e: NativeSyntheticEvent<TextInputChangeEventData>, key: string) => void;
    data: Omit<IService, 'img'>;
}

/**
 * @shared `Input Title for Service`
 */
const InputServiceTitle: FC<IInputService> = ({sizeTitle, onChangeForm, data}) => {

    return (
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
    );
};


export default InputServiceTitle;