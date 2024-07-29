import React, { FC } from 'react';
import QuestionHOC from '@/components/wrappers/QuestionHOC/QuestionHOC';
import Title from '@/components/shared/Title/Title';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';

import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import type { TFormMaster } from '@/app/admin/adminMaster';


export interface IInputMaster {
    sizeTitle: number;
    onChangeForm: (e: NativeSyntheticEvent<TextInputChangeEventData>, key: string) => void;
    data: TFormMaster;
}

/**
 * @shared `Input Name for Master.`
 */
const InputMasterName: FC<IInputMaster> = ({sizeTitle, onChangeForm, data}) => {

    return (
        <>
            <QuestionHOC
                title='Имя мастера.'
                discription={`Введите имя, например: Мария, Катя и т.д. \nМаскимальная длинна названия до 30 символов.`}
                marginTop={10}
            >
                <Title text='Имя' location='left' fontSize={sizeTitle} />
            </QuestionHOC>
            
            <InputGeneric<TFormMaster>
                keyName='name'
                placeholder='Имя мастера'
                img={require('@/source/img/icon/user-grey.png')}
                onChangeForm={onChangeForm}
                value={data.name}
                maxLength={30}
                marginTop={4}
            />
        </>
    );
};


export default InputMasterName;