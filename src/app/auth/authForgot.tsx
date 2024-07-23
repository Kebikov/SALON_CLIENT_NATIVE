import { View, Text, StyleSheet } from 'react-native';
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import React, { FC, useState } from 'react';
import WrapperScroll from '@/components/wrappers/WrapperScroll/WrapperScroll';
import { COLOR_ROOT } from '@/data/colors';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import DoYouHaveAnAccount from '@/components/shared/DoYouHaveAnAccount/DoYouHaveAnAccount';
import httpAuthenticationService from '@/api/routes/authentication/service/http.authentication.service';
import { useHookCheckDataForm } from '@/hooks/useHookCheckDataForm';
import Discription from '@/components/shared/Discription/Discription';
import Title from '@/components/shared/Title/Title';
import { useHookRouter } from '@/helpers/router/useHookRouter';


interface IEmail {
    email: string;
}


/**
 * @page Страница востановления пароля.
 */
const AuthForgot: FC = () => {

    const {appRouter} = useHookRouter();

    const  {checkDataForm} = useHookCheckDataForm();

    const [data, setData] = useState<IEmail>({
        email: ''
    });
    
    const onChangeForm = (e: NativeSyntheticEvent<TextInputChangeEventData>, key: string) => {
        setData( state => ({...state, [key]: e.nativeEvent.text}) );
    }

    const recovery = async () => {
        if(checkDataForm(data)) return;
        const result = await httpAuthenticationService.POST_authForgot(data.email);
    }

    return (
        <WrapperScroll backgroundColor={COLOR_ROOT.BACKGROUND} barStyle='dark-content' >
            <View style={styles.main}>
                <Title text='Если забыли пароль,' location='left' fontSize={19} />
                <Discription text='пожалуйста введите ваш email ниже и мы вышлим вам новый пароль для входа.' marginTop={5}/>
                <InputGeneric 
                    onChangeForm={onChangeForm}
                    placeholder='Email'
                    keyName='email'
                    img={require('@/source/img/icon/email-grey.png')}
                />
                <ButtonWithIcon pushButton={() => recovery()} title='Востановить' marginTop={30}/>
                <DoYouHaveAnAccount pushButton={() => appRouter.navigate('/')} title='Вернуться к началу ?' color={COLOR_ROOT.MIDDLE_GRAY} textButton=' Вернуться' />
            </View>
        </WrapperScroll>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 15
    }
});

export default AuthForgot;