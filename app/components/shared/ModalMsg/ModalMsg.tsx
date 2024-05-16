import { View, Text, StyleSheet, Modal, Pressable, Image, Platform } from 'react-native';
import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { setAppModalObject } from '@/redux/slice/modal.slice';
import { BlurView } from 'expo-blur';


const imgMsg = require('@/source/img/icon/ok.png');
const imgError = require('@/source/img/icon/error.png');
const imgQuestion = require('@/source/img/icon/question.png');

/**
 * Тип для отображения в определенном стиле модальное окно :
 * - 'error' => стиль ошибки
 * - 'msg' => стиль сообщения
 */
export type TMessage =  'error' | 'message' | 'question';



/**
 * @shared Модальное окно.
 */
const ModalMsg: FC = () => {

    const {message, discription, modalType, modalVisible} = useAppSelector(state => state.modalSlice.modal);
    const dispatch = useAppDispatch();

    const buttonPushed = () => {
        dispatch(setAppModalObject('close'));
    };

    /**
     * Изображение и цвет кнопки в зависимости от нужного типа.
     */
    let img = null;
    let colorForButton = 'black';
    switch(modalType) {
        case 'message':
            img = imgMsg;
            colorForButton = 'rgba(0, 189, 152, 0.5)';
            break;
        case 'error':
            img = imgError;
            colorForButton = 'rgba(214, 51, 49, 0.5)';
            break;
        case 'question':
            img = imgQuestion;
            colorForButton = 'rgba(172, 179, 188, .4)';
            break;
    }

    return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
            >
                <BlurView intensity={30} tint='dark' style={styles.main}>
                    <View style={styles.body}>

                        <View style={styles.header}>
                            <View style={styles.boxImg}>
                                <Image style={styles.img} source={img ? img : undefined} />
                            </View>
                            <Text style={styles.msg} >
                                {message}
                            </Text>
                        </View>

                        <View style={styles.boxDiscription} >
                            <Text style={styles.textDiscription}>{discription}</Text>
                        </View>
                        <Pressable
                            onPress={() => buttonPushed()}
                            style={[styles.button, {backgroundColor: colorForButton}]}
                        >
                            <Text style={styles.text} >OK</Text>
                        </Pressable>
                    </View>
                </BlurView>
                
            </Modal>
    );
};


const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Platform.OS === 'ios' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.6)'
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 20,
        width: '80%',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)'
    },
    header: {
        width: '100%',
        paddingTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    msg: {
        paddingLeft: 5,
        textAlign: 'center',
        fontSize: Platform.OS === 'ios' ? 18 : 16,
        color: 'white',
    },
    text: {
        textAlign: 'center',
        fontSize: Platform.OS === 'ios' ? 19 : 16,
        color: 'white'
    },
    boxDiscription: {
        width: '100%',
        paddingTop: 5,
        paddingHorizontal: 10
    },
    textDiscription: {
        textAlign: 'center',
        fontSize: Platform.OS === 'ios' ? 15 : 13,
        color: 'white'
    },
    boxImg: {
        width: 30,
        height: 30,
        opacity: .7,
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    button: {
        marginTop: 15,
        width: '100%',
        paddingVertical: 7
    }
});

export default ModalMsg;


