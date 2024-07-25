import React, { FC } from 'react';
import QuestionHOC from '@/components/wrappers/QuestionHOC/QuestionHOC';
import Title from '@/components/shared/Title/Title';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';
import type { ServiceDTO } from '@/api/routes/service/types/service.types';
import type { IInputService } from './InputServiceTitle';


/**
 * @shared `Input Title for Description`
 */
const InputServicePrice: FC<IInputService> = ({sizeTitle, onChangeForm, data}) => {

    return (
        <> 
            <QuestionHOC
                title='Стоимость'
                discription='Введите стоимость услуги, например: 45, будет установлено 45 рублей.'
                marginTop={10}
            >
                <Title text='Стоимость' location='left' fontSize={sizeTitle} />
            </QuestionHOC>
            <InputGeneric<Omit<ServiceDTO, 'id'>>
                keyName='price'
                placeholder='Стоимость услуги'
                img={require('@/source/img/icon/group-gray.png')}
                onChangeForm={onChangeForm}
                value={ data.price ? String(data.price) : '' }
                keyboardType='numeric'
            />
        </>
    );
};


export default InputServicePrice;