import { View, Text, StyleSheet, TextInput, Image, NativeSyntheticEvent, TextInputChangeEventData, Platform } from 'react-native';
import React, { FC, useState } from 'react';
import WrapperScroll from '@/components/wrappers/WrapperScroll/WrapperScroll';
import { COLOR_ROOT } from '@/data/colors';
import JoinGoogle from '@/components/shared/JoinGoogle/JoinGoogle';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import DoYouHaveAnAccount from '@/components/shared/DoYouHaveAnAccount/DoYouHaveAnAccount';
import InputPassword from '@/components/shared/InputPassword/InputPassword';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';
import LinesWithOr from '@/components/shared/LinesWithOr/LinesWithOr';
import { IReqBodyRegistrationEmail } from '@/api/routes/registration/types/registration.types';
import { requestOnRegistration } from '@/helpers/helpersForComponents/AuthCreateAccount/requestOnRegistration';
import { useHookCheckDataForm } from '@/hooks/useHookCheckDataForm';
import { stylesGeneric } from '@/components/shared/InputGeneric/InputGeneric';
import Discription from '@/components/shared/Discription/Discription';
import Title from '@/components/shared/Title/Title';
import { useHookRouter } from '@/helpers/router/useHookRouter';


export type TKeyStateCreateAccount = keyof IReqBodyRegistrationEmail;


/**
 * @page Страница регистрации нового пользователя.
 */
const AuthCreateAccount: FC = () => {

    const {appRouter} = useHookRouter();

    const [data, setData] = useState<IReqBodyRegistrationEmail>({
        name: '', 
        email: '',
        phone: '',
        password: ''
    });

    const {checkDataForm} = useHookCheckDataForm();

    const goToPageAuthEnter = () => {
        appRouter.navigate('/auth/authEnter');
    }

    const onChangeForm = (e: NativeSyntheticEvent<TextInputChangeEventData>, key: string) => {
        e.persist();
        setData( state => ({...state, [key]: e.nativeEvent.text}) );
    }

    /**
     * Создание акаунта через Email
     */
    const createAccount = async () => {
        if(checkDataForm(data)) return;

        const resultRegistration = await requestOnRegistration(data);
        if(resultRegistration) {
            appRouter.replace('/user');
        }
    }

    return (
        <WrapperScroll backgroundColor={COLOR_ROOT.BACKGROUND} barStyle='dark-content' >
            <View style={styles.main}>
                <Title text='Создание вашего акаунта' location='left' fontSize={19} />
                <Discription text='Пожалуйста заполните информацию о себе ниже и мы создадим для вас акаунт.' marginTop={5}/>
                <InputGeneric keyName={'name'} placeholder='Имя' img={require('@/source/img/icon/user-grey.png')} onChangeForm={onChangeForm} />
                <InputGeneric keyName={'email'} placeholder='Email'  img={require('@/source/img/icon/email-grey.png')} onChangeForm={onChangeForm} />
                <View style={[stylesGeneric.boxInput, stylesGeneric.shadowTop]} >
                    <TextInput 
                        style={[stylesGeneric.input, {paddingLeft: 100}]} 
                        placeholder='291234567' 
                        placeholderTextColor={COLOR_ROOT.LIGHT_ICON}
                        keyboardType="numeric" 
                        onChange={text => onChangeForm(text, 'phone')} 
                    />
                    <Text style={styles.numberStart} >+375 | </Text>
                    <Image style={[stylesGeneric.icon, {width: 24, height: 16, marginTop: -8}]} source={require('@/source/img/icon/flag.jpg')} />
                </View>
                <InputPassword onChangeForm={onChangeForm} />
                <ButtonWithIcon title='создать акаунт' pushButton={() => createAccount()} />
                <LinesWithOr/>
                <JoinGoogle border={true} />
                <DoYouHaveAnAccount pushButton={goToPageAuthEnter} title='Уже есть аккаунт ?' textButton=' Войти' color={COLOR_ROOT.MIDDLE_GRAY} />
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
    numberStart: {
        position: 'absolute',
        top: '50%',
        left: 45,
        marginTop: Platform.OS === 'ios' ? -9 : -12,
        color: '#8d9299',
        fontWeight: '400',
        fontSize: 16
    }
});

export default AuthCreateAccount;