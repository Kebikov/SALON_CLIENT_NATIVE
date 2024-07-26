import React, { FC } from 'react';
import QuestionHOC from '@/components/wrappers/QuestionHOC/QuestionHOC';
import Title from '@/components/shared/Title/Title';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';
import type { ServiceDTO } from '@/api/routes/service/types/service.types';
import type { IInputService } from './InputServiceTitle';


/**
 * @shared `Input Title for Description`
 */
const InputServiceTime: FC<IInputService> = ({sizeTitle, onChangeForm, data}) => {

    return (
        <> 
            <QuestionHOC
                title='Длительность услуги'
                discription='Установите длительность услуги в минутах.'
                marginTop={10}
            >
                <Title text='Длительность услуги' location='left' fontSize={sizeTitle} />
            </QuestionHOC>
            <InputGeneric<Omit<ServiceDTO, 'id'>>
                keyName='time'
                placeholder='Длительность в минутах'
                img={require('@/source/img/icon/group-gray.png')}
                onChangeForm={onChangeForm}
                value={ data.time ? String(data.time) : '' }
                keyboardType='numeric'
            />
        </>
    );
};


export default InputServiceTime;