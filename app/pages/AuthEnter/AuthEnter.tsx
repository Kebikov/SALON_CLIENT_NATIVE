import { View, Text, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, Pressable } from 'react-native';
import React, { FC, useState } from 'react';
import WrapperScroll from '@/components/wrappers/WrapperScroll/WrapperScroll';
import InputPassword from '@/components/shared/InputPassword/InputPassword';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import LinesWithOr from '@/components/shared/LinesWithOr/LinesWithOr';
import JoinGoogle from '@/components/shared/JoinGoogle/JoinGoogle';
import { COLOR_ROOT } from '@/data/colors';
import DoYouHaveAnAccount from '@/components/shared/DoYouHaveAnAccount/DoYouHaveAnAccount';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { TypeRootPage } from '@/navigation/navigation.types';
import { CheckForm } from '@/helpers/check/checkForm';
import httpAuthenticationService from '@/api/routes/authentication/service/http.authentication.service';
import { useHookCheckErrorResponce } from '@/hooks/useHookCheckErrorResponce';
import { asyncStorageSaveUser } from '@/helpers/save/saveUserInAsyncStorage';
import Discription from '@/components/shared/Discription/Discription';
import Title from '@/components/shared/Title/Title';


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
            return modalMessageError('Проверьте Email', 'Проверьте введенный Email который вы ввели, в нем есть ошибки.');
        }
        //* Проверка валидности пароля.
        if(!CheckForm.checkPassword(data.password)) {
            return modalMessageError('Проверьте пароль', 'Проверьте введенный пароль, он должен быть не короче 4-ти символов.');
        }
        //* Запрос на авторизицию.
        const result = await httpAuthenticationService.POST_authentication(data);
        if(!result) return;
        await asyncStorageSaveUser(result);
        navigate('Home');
    }

    return (
        <WrapperScroll backgroundColor='white' barStyle='dark-content' >
            <View style={styles.main}>
                <Title text='Добро пожаловать' location='left' fontSize={19}/>
                <Discription text='Рады снова Вас видеть, пожалуйста введите свой email и пароль, для входа.' marginTop={5}/>
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
                <ButtonWithIcon pushButton={() => logIn()} title='Вход'/>
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
    }
});

export default AuthEnter;