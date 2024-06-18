import { View, Text, StyleSheet, TextInput, Image, Pressable, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import React, { FC, useState } from 'react';
import { TKeyStateCreateAccount } from '@/pages/AuthCreateAccount/AuthCreateAccount';
import { stylesGeneric } from '../InputGeneric/InputGeneric';
import { COLOR_ROOT } from '@/data/colors';


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
        <View style={[stylesGeneric.boxInput, stylesGeneric.shadowTop, {marginBottom}]} >
            <View style={stylesGeneric.shadowBottom}>
                <TextInput 
                    style={[stylesGeneric.input]}
                    placeholder='Пароль' 
                    placeholderTextColor={COLOR_ROOT.LIGHT_ICON}
                    onChange={text => onChangeForm(text, 'password')} 
                    secureTextEntry={isSecureText} 
                />
                <Image style={stylesGeneric.icon} source={require('@/source/img/icon/password-grey.png')} />
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
        </View>
    );
};


const styles = StyleSheet.create({
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