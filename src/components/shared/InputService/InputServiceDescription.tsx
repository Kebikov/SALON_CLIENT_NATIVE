import React, { FC } from 'react';
import QuestionHOC from '@/components/wrappers/QuestionHOC/QuestionHOC';
import Title from '@/components/shared/Title/Title';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';
import type { IService } from '@/api/routes/service/types/service.types';
import type { IInputService } from './InputServiceTitle';


/**
 * @shared `Input Title for Description`
 */
const InputServiceDescription: FC<IInputService> = ({sizeTitle, onChangeForm, data}) => {

    return (
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
    );
};


export default InputServiceDescription;