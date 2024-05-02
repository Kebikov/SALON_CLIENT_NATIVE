import { View, Text, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, Pressable } from 'react-native';
import React, { FC, useState } from 'react';
import WrapperScroll from '@/shared/WrapperScroll/WrapperScroll';
import InputPassword from '@/shared/InputPassword/InputPassword';
import InputGeneric from '@/shared/InputGeneric/InputGeneric';
import JoinEmail from '@/shared/JoinEmail/JoinEmail';
import LinesWithOr from '@/shared/LinesWithOr/LinesWithOr';
import JoinGoogle from '@/shared/JoinGoogle/JoinGoogle';
import { COLOR_ROOT } from '@/data/colors';
import DoYouHaveAnAccount from '@/shared/DoYouHaveAnAccount/DoYouHaveAnAccount';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { TypeRootPage } from '@/navigation/navigation.types';
import { CheckForm } from '@/helpers/check/checkForm';
import httpAuthenticationService from '@/api/routes/authentication/service/http.authentication.service';
import { useHookCheckErrorResponce } from '@/hooks/useHookCheckErrorResponce';
import { asyncStorageSaveUser } from '@/helpers/save/saveUserInAsyncStorage';


interface IAuthEnter {
    email: string;
    password: string;
}

/**
 * @page Страница входа в приложение.
 */
const AuthEnter: FC = () => {

    const {isIError, isUndefined, modalMessageError, dispatch, setAppModalObject} = useHookCheckErrorResponce();
    const [data, setData] = useState<IAuthEnter>({
        email: '',
        password: ''
    });

    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>();

    /**
     * Переход на страницу => "AuthCreateAccount".
     */
    const goToPageRegistration = () => {
        navigate('AuthCreateAccount');
    }

    const onChangeForm = (e: NativeSyntheticEvent<TextInputChangeEventData>, key: string) => {
        e.persist();
        setData( state => ({...state, [key]: e.nativeEvent.text}) );
    }

    const logIn = async () => {
        //* Проверка валидности email.
        if(!CheckForm.checkEmail(data.email)) {
            return modalMessageError('Проверьте введенный Email.');
        }
        //* Проверка валидности пароля.
        if(!CheckForm.checkPassword(data.password)) {
            return modalMessageError('Пароль не короче 4-ти символов.');
        }
        //* Запрос на авторизицию.
        const result = await httpAuthenticationService.POST_authentication(data);
        if(isUndefined(result)) return;
        if(isIError(result)) return;
        await asyncStorageSaveUser(result);
        navigate('Home');
    }

    return (
        <WrapperScroll backgroundColor='white' barStyle='dark-content' >
            <View style={styles.main}>
                <Text style={styles.title} >Добро пожаловать,</Text>
                <Text style={styles.text} >Рады снова Вас видеть, пожалуйста введите свой email и пароль, для входа.</Text>
                <InputGeneric 
                    keyName={'email'} 
                    onChangeForm={onChangeForm}  
                    placeholder='Email' 
                    img={require('@/source/img/icon/email-grey.png')}
                />
                <InputPassword onChangeForm={onChangeForm} marginBottom={0} />
                <View style={styles.boxForgot}>
                    <Pressable 
                        onPress={() => navigate('AuthForgot')}
                    >
                        <Text style={styles.textForgot}>Забыли пароль ?</Text>
                    </Pressable>
                </View>
                <JoinEmail pushButton={() => logIn()} title='Вход'/>
                <LinesWithOr/>
                <JoinGoogle title='Вход через Google' border={true} />
                <DoYouHaveAnAccount pushButton={goToPageRegistration} title='Нет аккаунта ?' textButton=' Регистрация' color={COLOR_ROOT.MIDDLE_GRAY} />
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
    boxForgot: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 5,
        marginBottom: 30
    },
    textForgot: {
        fontSize: 15,
        fontWeight: '400',
        color: COLOR_ROOT.MAIN_COLOR
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

export default AuthEnter;