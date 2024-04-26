import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { FC } from 'react';
import Wrapper from '@/shared/Wrapper/Wrapper';
import BottomMenu from '@/widgets/BottomMenu/BottomMenu';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import type { TypeRootPage } from '@/navigation/navigation.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR_ROOT } from '@/data/colors';

/**
 * @page Страница пользователя.
 */
const User: FC = () => {

    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>()

    const exitOut = async () => {
        await AsyncStorage.clear();
        navigate('Auth');
    }

    return (
        <Wrapper backgroundColor='white' barStyle='light-content' >
            <View style={styles.main} >
                <View style={styles.box} >
                    <Text>USER</Text>
                    <Pressable
                        onPress={() => exitOut()}
                        style={styles.exitButton}
                    >
                        <Text style={styles.textButton} >Выход из акаунта</Text>
                    </Pressable>
                </View>
            </View>
            <BottomMenu page='User' />
        </Wrapper>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    box: {

    },
    exitButton: {
        marginTop: 20,
        height: 50,
        backgroundColor: COLOR_ROOT.PINK,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton: {
        color: 'white',
        fontSize: 17
    }
});

export default User;