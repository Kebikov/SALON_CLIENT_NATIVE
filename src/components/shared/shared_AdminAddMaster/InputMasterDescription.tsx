import React, { FC } from 'react';
import QuestionHOC from '@/components/wrappers/QuestionHOC/QuestionHOC';
import Title from '@/components/shared/Title/Title';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';

import type { IAddMaster } from '@/api/routes/master/types/master.dto';
import type { IInputMaster } from './InputMasterName';


/**
 * @shared `Input Name for Description.`
 */
const InputMasterDescription: FC<IInputMaster> = ({sizeTitle, onChangeForm, data}) => {

    return (
        <>
            <QuestionHOC
                title='Описание мастера.'
                discription={`Введите описание для мастера, его будет видеть клиент при переходе на страницу мастера. \nМаскимальная длинна названия до 200 символов.`}
                marginTop={10}
            >
                <Title text='Описание' location='left' fontSize={sizeTitle} />
            </QuestionHOC>
            
            <InputGeneric<IAddMaster>
                keyName='description'
                placeholder='Описание для мастера'
                img={require('@/source/img/icon/write.png')}
                onChangeForm={onChangeForm}
                value={data.description}
                maxLength={200}
                marginTop={4}
            />
        </>
    );
};


export default InputMasterDescription;