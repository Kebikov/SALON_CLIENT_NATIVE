import { View, Text, StyleSheet } from 'react-native';
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import React, { FC, useState } from 'react';
import WrapperScroll from '@/components/wrappers/WrapperScroll/WrapperScroll';
import { COLOR_ROOT } from '@/data/colors';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import DoYouHaveAnAccount from '@/components/shared/DoYouHaveAnAccount/DoYouHaveAnAccount';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { TypeRootPage } from '@/navigation/navigation.types';
import httpAuthenticationService from '@/api/routes/authentication/service/http.authentication.service';
import { useHookCheckDataForm } from '@/hooks/useHookCheckDataForm';
import { useHookCheckErrorResponce } from '@/hooks/useHookCheckErrorResponce';


interface IEmail {
    email: string;
}


/**
 * @page Страница востановления пароля.
 */
const AuthForgot: FC = () => {

    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>();

    const  {checkDataForm} = useHookCheckDataForm();
    const {isIError, isMessage, isUndefined} = useHookCheckErrorResponce();

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
        <WrapperScroll backgroundColor='white' barStyle='dark-content' >
            <View style={styles.main}>
                <Text style={styles.title} >Если забыли пароль,</Text>
                <Text style={styles.text} >Пожалуйста введите ваш email ниже и мы вышлим вам новый пароль для входа.</Text>
                <InputGeneric 
                    onChangeForm={onChangeForm}
                    placeholder='Email'
                    keyName='email'
                    img={require('@/source/img/icon/email-grey.png')}
                />
                <ButtonWithIcon pushButton={() => recovery()} title='Востановить' marginTop={30}/>
                <DoYouHaveAnAccount pushButton={() => navigate('Auth')} title='Вернуться к началу ?' color={COLOR_ROOT.MIDDLE_GRAY} textButton=' Вернуться' />
            </View>
        </WrapperScroll>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: COLOR_ROOT.BLACK
    },
    text: {
        marginTop: 5,
        marginBottom: 20,
        fontSize: 16,
        fontWeight: '400',
        color: COLOR_ROOT.MIDDLE_GRAY
    },
});

export default AuthForgot;