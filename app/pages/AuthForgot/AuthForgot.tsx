import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import WrapperScroll from '@/shared/WrapperScroll/WrapperScroll';
import { COLOR_ROOT } from '@/data/colors';
import InputGeneric from '@/shared/InputGeneric/InputGeneric';
import JoinEmail from '@/shared/JoinEmail/JoinEmail';
import DoYouHaveAnAccount from '@/shared/DoYouHaveAnAccount/DoYouHaveAnAccount';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { TypeRootPage } from '@/navigation/navigation.types';


/**
 * @page Страница востановления пароля.
 */
const AuthForgot: FC = () => {

    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>();

    return (
        <WrapperScroll backgroundColor='white' barStyle='dark-content' >
            <View style={styles.main}>
                <Text style={styles.title} >Если забыли пароль,</Text>
                <Text style={styles.text} >Пожалуйста введите ваш email ниже и мы вышлим вам новый пароль для входа.</Text>
                <InputGeneric 
                    onChangeForm={() => {}}
                    placeholder='Email'
                    keyName='email'
                    img={require('@/source/img/icon/email-grey.png')}
                />
                <JoinEmail pushButton={() => {}} title='Востановить' marginTop={30}/>
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