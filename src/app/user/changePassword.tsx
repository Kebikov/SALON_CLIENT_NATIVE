import { View, Text, StyleSheet } from 'react-native';
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import React, { FC, useState } from 'react';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';
import WrapperScroll from '@/components/wrappers/WrapperScroll/WrapperScroll';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import { useHookCheckErrorResponce } from '@/hooks/useHookCheckErrorResponce';
import httpAuthenticationService from '@/api/routes/authentication/service/http.authentication.service';
import HeaderTitle from '@/components/widgets/HeaderTitle/HeaderTitle';
import Discription from '@/components/shared/Discription/Discription';
import Title from '@/components/shared/Title/Title';


interface ITwoPassword {
    password: string;
    passwordTwo: string;
}


/**
 * @page Страница смены пароля на новый.
 */
const ChangePassword: FC = () => {

    const {modalMessageError, isIError, isMessage, isUndefined} = useHookCheckErrorResponce();

    const [data, setData] = useState<ITwoPassword>({
        password: '',
        passwordTwo: ''
    });
  
    const onChangeForm = (e: NativeSyntheticEvent<TextInputChangeEventData>, key: string) => {
        e.persist();
        setData( state => ({...state, [key]: e.nativeEvent.text}) );
    }

    const changePassword = async () => {
        if(data.password === '' || data.passwordTwo === '') return modalMessageError('Заполните пароль', 'Поле с паролем не может быть пустым.');
        if(data.password !== data.passwordTwo) return modalMessageError('Разные пароли' ,'Поля с паролями должны быть одинаковыми.');
        if(data.password.length < 4 || data.passwordTwo.length < 4) return modalMessageError('Короткий пароль' ,'Длинна пароля должна быть больше 3-х символов.');
        const result = await httpAuthenticationService.POST_changePassword(data.password);
        if(!result) return;
        if(isMessage(result)) {
            setData({password: '', passwordTwo: ''});
            return;
        }
    }

    return (
        <>
            
            <WrapperScroll>
                <HeaderTitle text='Смена пароля' />

                <View style={styles.main}>
                    <Title text='Хотите сменить пароль ?' location='left' />
                    <Discription text='Для смены пароля на новый, введите новый пароль и продублируйте его.' marginTop={5} />
                    <InputGeneric
                        onChangeForm={onChangeForm}
                        placeholder='Ваш новый пароль'
                        keyName='password'
                        img={require('@/source/img/icon/password-grey.png')}
                        value={data.password}
                    />
                    <InputGeneric
                        onChangeForm={onChangeForm}
                        placeholder='Продублируйте новый пароль'
                        keyName='passwordTwo'
                        img={require('@/source/img/icon/password-grey.png')}
                        value={data.passwordTwo}
                    />
                    <ButtonWithIcon title='смена пароля' marginTop={20} pushButton={() => changePassword()} />
                </View>
            </WrapperScroll>
        </>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    }
});

export default ChangePassword;