import { View, Text, StyleSheet, TextInput, Image, NativeSyntheticEvent, TextInputChangeEventData, ToastAndroid} from 'react-native';
import React, { FC, useState } from 'react';
import WrapperScroll from '@/shared/WrapperScroll/WrapperScroll';
import { COLOR_ROOT } from '@/data/colors';
import JoinGoogle from '@/shared/JoinGoogle/JoinGoogle';
import JoinEmail from '@/shared/JoinEmail/JoinEmail';
import DoYouHaveAnAccount from '@/shared/DoYouHaveAnAccount/DoYouHaveAnAccount';
import InputPassword from '@/shared/InputPassword/InputPassword';
import InputGeneric from '@/shared/InputGeneric/InputGeneric';
import LinesWithOr from '@/shared/LinesWithOr/LinesWithOr';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { TypeRootPage } from '@/navigation/navigation.types';
import { checkDataForm } from './helpers/checkDataForm';



export interface IStateCreateAccount {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export type TKeyStateCreateAccount = keyof IStateCreateAccount;


/**
 * @page Страница регистрации нового пользователя.
 */
const AuthCreateAccount: FC = () => {

    const [data, setData] = useState<IStateCreateAccount>({
        name: '', 
        email: '',
        phone: '',
        password: ''
    });

    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>();

    const goToPageAuthEnter = () => {
        navigate('AuthEnter');
    }

    const onChangeForm = (e: NativeSyntheticEvent<TextInputChangeEventData>, key: string) => {
        setData( state => ({...state, [key]: e.nativeEvent.text}) );
    }

    const createAccount = () => {
        const resultCheck = checkDataForm(data);
        if(!resultCheck) return;


    }

    return (
        <WrapperScroll backgroundColor='white' barStyle='dark-content' >
            <View style={styles.main}>
                <Text style={styles.title} >Создание вашего акаунта,</Text>
                <Text style={styles.text} >Пожалуйста заполните информацию о себе ниже и мы создадим для вас акаунт.</Text>
                <InputGeneric keyName={'name'} placeholder='Имя' img={require('@/source/img/icon/user-grey.png')} onChangeForm={onChangeForm} />
                <InputGeneric keyName={'email'} placeholder='Email'  img={require('@/source/img/icon/email-grey.png')} onChangeForm={onChangeForm} />
                <View style={styles.boxInput} >
                    <TextInput style={[styles.input, {paddingLeft: 100}]} placeholder='291234567' keyboardType="numeric" onChange={text => onChangeForm(text, 'phone')} />
                    <Text style={styles.numberStart} >+375 | </Text>
                    <Image style={[styles.icon, {width: 24, height: 16, marginTop: -8}]} source={require('@/source/img/icon/flag.jpg')} />
                </View>
                <InputPassword onChangeForm={onChangeForm} />
                <JoinEmail title='создать акаунт' pushButton={() => createAccount()} />
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
    boxInput: {
        position: 'relative',
        marginTop: 15
    },
    icon: {
        position: 'absolute',
        top: '50%',
        left: 15,
        width: 20,
        height: 20,
        marginTop: -10
    },
    numberStart: {
        position: 'absolute',
        top: '50%',
        left: 45,
        marginTop: -12,
        color: '#8d9299',
        fontWeight: '400',
        fontSize: 16
    },
    input: {
        backgroundColor: COLOR_ROOT.BACKGROUND_INPUT,
        height: 55,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 50,
        fontSize: 17,
        fontWeight: '400',
        color: COLOR_ROOT.GRAY
    }
});

export default AuthCreateAccount;