import React, { FC } from 'react';
import QuestionHOC from '@/components/wrappers/QuestionHOC/QuestionHOC';
import Title from '@/components/shared/Title/Title';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';

import type { IAddMaster } from '@/api/routes/master/types/master.dto';
import type { IInputMaster } from './InputMasterName';


/**
 * @shared `Input Name for Surname.`
 */
const InputMasterSurname: FC<IInputMaster> = ({sizeTitle, onChangeForm, data}) => {

    return (
        <>
            <QuestionHOC
                title='Фамилия мастера.'
                discription={`Введите фамилию, например: Иванова, Петрова и т.д. \nМаскимальная длинна названия до 30 символов.`}
                marginTop={10}
            >
                <Title text='Фамилия' location='left' fontSize={sizeTitle} />
            </QuestionHOC>
            
            <InputGeneric<IAddMaster>
                keyName='surname'
                placeholder='Фамилия мастера'
                img={require('@/source/img/icon/group-gray.png')}
                onChangeForm={onChangeForm}
                value={data.surname}
                maxLength={30}
            />
        </>
    );
};


export default InputMasterSurname;