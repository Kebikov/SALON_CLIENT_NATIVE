import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { FC } from 'react';
import { Iscreen } from '@/pages/Auth/Auth';


interface IDoYouHaveAnAccount {
    setScreen: React.Dispatch<React.SetStateAction<Iscreen>>;
    isAuthUser: boolean;
}


/**
 * @shared Текст "Уже есть аккаунт ?" и "Войти"
 */
const DoYouHaveAnAccount: FC<IDoYouHaveAnAccount> = ({setScreen, isAuthUser}) => {

    return (
        <View style={styles.textBox} >
            <Text style={styles.text} >{isAuthUser ? 'Уже есть аккаунт ?' : 'Нет аккаунта ?'}</Text>
            <Pressable
                onPress={() => {
                    if(isAuthUser) {
                        setScreen({
                            AuthStart: false,
                            AuthRegistrationEmail: false,
                            AuthAuthorization: true
                        });
                    } else {
                        setScreen({
                            AuthStart: false,
                            AuthRegistrationEmail: true,
                            AuthAuthorization: false
                        })
                    }
                }}
            >
                <Text style={styles.textExit} >{isAuthUser ? ' Войти' : ' Регистрация'}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    textBox: {
        marginTop: 15,
        flexDirection: 'row'
    },
    text: {
        color: 'white',
        fontSize: 16
    },
    textExit: {
        color: 'orange',
        fontSize: 16
    }
});

export default DoYouHaveAnAccount;