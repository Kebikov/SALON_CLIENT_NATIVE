import { View, Text, StyleSheet, TextInput, Image, Pressable, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import React, { FC, useState } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import { TKeyStateCreateAccount } from '@/pages/AuthCreateAccount/AuthCreateAccount';


interface IInputPassword {
    onChangeForm: (text: NativeSyntheticEvent<TextInputChangeEventData>, key: TKeyStateCreateAccount) => void;
    marginBottom?: number;
}


/**
 * @shared Поле ввода пароля.
 * @param onChangeForm Функция изминения состояния у формы.
 * @param marginBottom ? Отступ с низу (по умолчанию 40).
 * @example <InputPassword onChangeForm={#} />
 */
const InputPassword: FC<IInputPassword> = ({onChangeForm, marginBottom = 40}) => {

    const [isSecureText, setIsSecureText] = useState<boolean>(true);

    return (
        <View style={[styles.boxInput, {marginBottom}]} >
            <TextInput 
                style={styles.input}
                placeholder='Пароль' 
                onChange={text => onChangeForm(text, 'password')} 
                secureTextEntry={isSecureText} 
            />
            <Image style={styles.icon} source={require('@/source/img/icon/password-grey.png')} />
            <Pressable style={styles.eye} onPress={() => setIsSecureText(state => !state)} >
                <Image 
                    style={styles.eyeImg} 
                    source={
                        isSecureText 
                        ? 
                        require('@/source/img/icon/eye-close.png') 
                        : 
                        require('@/source/img/icon/eye.png')
                    } 
                />
            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
    boxInput: {
        position: 'relative',
        marginTop: 15
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
    },
    icon: {
        position: 'absolute',
        top: '50%',
        left: 15,
        width: 20,
        height: 20,
        marginTop: -10
    },
    eye: {
        position: 'absolute',
        top: '50%',
        right: 15,
        width: 34,
        height: 34,
        padding: 6,
        marginTop: -17
    },
    eyeImg: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%'
    },
});


export default InputPassword;