import React, { FC } from 'react';
import QuestionHOC from '@/components/wrappers/QuestionHOC/QuestionHOC';
import Title from '@/components/shared/Title/Title';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';

import type { IAddMaster } from '@/api/routes/master/types/master.dto';
import type { IInputMaster } from './InputMasterName';


/**
 * @shared `Input Name for Description.`
 */
const InputMasterPassword: FC<IInputMaster> = ({sizeTitle, onChangeForm, data}) => {

    return (
        <>
            <QuestionHOC
                title='Пароль мастера.'
                discription={`Введите пароль для мастера, он будет использоватся при входе в приложение. Минимальная длинна пароля 5 символов, маскимальная длинна до 30 символов.`}
                marginTop={10}
            >
                <Title text='Email' location='left' fontSize={sizeTitle} />
            </QuestionHOC>
            
            <InputGeneric<IAddMaster>
                keyName='password'
                placeholder='минимум 5 символов'
                img={require('@/source/img/icon/group-gray.png')}
                onChangeForm={onChangeForm}
                value={data.password}
                maxLength={30}
            />
        </>
    );
};


export default InputMasterPassword;