import React, { FC } from 'react';
import QuestionHOC from '@/components/wrappers/QuestionHOC/QuestionHOC';
import Title from '@/components/shared/Title/Title';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';

import type { IAddMaster } from '@/api/routes/master/types/master.dto';
import type { IInputMaster } from './InputMasterName';


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
            
            <InputGeneric<IAddMaster>
                keyName='email'
                placeholder='master@gmail.com'
                img={require('@/source/img/icon/group-gray.png')}
                onChangeForm={onChangeForm}
                value={data.email}
                maxLength={30}
            />
        </>
    );
};


export default InputMasterEmail;