import { View, Text, StyleSheet } from 'react-native';
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import React, { FC, useState } from 'react';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';
import WrapperScrollMenu from '@/components/wrappers/WrapperScrollMenu/WrapperScrollMenu';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import { COLOR_ROOT } from '@/data/colors';
import { useHookCheckErrorResponce } from '@/hooks/useHookCheckErrorResponce';
import httpAuthenticationService from '@/api/routes/authentication/service/http.authentication.service';
import HeaderTitle from '@/components/widgets/HeaderTitle/HeaderTitle';


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
            
            <WrapperScrollMenu page='ChangePassword' >
                <HeaderTitle text='Смена пароля' />

                <View style={styles.main}>
                    <Text style={styles.text}>Для смены пароля на новый, введите новый пароль и продублируйте его.</Text>
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
            </WrapperScrollMenu>
        </>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: '600',
        color: COLOR_ROOT.BLACK
    },
    text: {
        fontSize: 16, 
        fontWeight: '400',
        color: COLOR_ROOT.MIDDLE_GRAY
    }
});

export default ChangePassword;