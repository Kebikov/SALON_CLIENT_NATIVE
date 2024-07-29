import React, { FC } from 'react';
import QuestionHOC from '@/components/wrappers/QuestionHOC/QuestionHOC';
import Title from '@/components/shared/Title/Title';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';

import type { IInputMaster } from './InputMasterName';
import type { TFormMaster } from '@/app/admin/adminMaster';


/**
 * @shared `Input Name for Description.`
 */
const InputMasterEmail: FC<IInputMaster> = ({sizeTitle, onChangeForm, data}) => {

    return (
        <>
            <QuestionHOC
                title='Email мастера.'
                discription={`Введите email мастера, он будет использоватся в качестве логина при входе в приложение. Маскимальная длинна email до 30 символов.`}
                marginTop={10}
            >
                <Title text='Email' location='left' fontSize={sizeTitle} />
            </QuestionHOC>
            
            <InputGeneric<TFormMaster>
                keyName='email'
                placeholder='master@gmail.com'
                img={require('@/source/img/icon/email-grey.png')}
                onChangeForm={onChangeForm}
                value={data.email}
                maxLength={30}
                marginTop={4}
            />
        </>
    );
};


export default InputMasterEmail;