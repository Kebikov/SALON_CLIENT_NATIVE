import React, { FC } from 'react';
import QuestionHOC from '@/components/wrappers/QuestionHOC/QuestionHOC';
import Title from '@/components/shared/Title/Title';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';

import type { IAddMaster } from '@/api/routes/master/types/master.dto';
import type { IInputMaster } from './InputMasterName';


/**
 * @shared `Input Name for Description.`
 */
const InputMasterPhone: FC<IInputMaster> = ({sizeTitle, onChangeForm, data}) => {

    return (
        <>
            <QuestionHOC
                title='Номер телефона'
                discription={`Введите Номер телефона мастера. Маскимальная длинна email до 13 символов.`}
                marginTop={10}
            >
                <Title text='Номер телефона' location='left' fontSize={sizeTitle} />
            </QuestionHOC>
            
            <InputGeneric<IAddMaster>
                keyName='phone'
                placeholder='+375291234567'
                img={require('@/source/img/icon/group-gray.png')}
                onChangeForm={onChangeForm}
                value={data.phone}
                maxLength={13}
            />
        </>
    );
};


export default InputMasterPhone;