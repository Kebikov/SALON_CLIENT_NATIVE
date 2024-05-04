import { View, Text, StyleSheet, Modal, Pressable, Image } from 'react-native';
import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { setAppModalObject } from '@/redux/slice/modal.slice';


const imgMsg = require('@/source/img/modal/ok.jpg');
const imgError = require('@/source/img/modal/error.jpg');

/**
 * Тип для отображения в определенном стиле модальное окно :
 * - 'error' => стиль ошибки
 * - 'msg' => стиль сообщения
 */
export type TMessage =  'error' | 'message' ;



/**
 * @shared Модальное окно.
 */
const ModalMsg: FC = () => {

    const {message, modalType, modalVisible} = useAppSelector(state => state.modalSlice.modal);
    const dispatch = useAppDispatch();

    const buttonPushed = () => {
        dispatch(setAppModalObject({modalVisible: false}));
    }

    /**
     * Изображение и цвет кнопки в зависимости от нужного типа.
     */
    let img = null;
    let colorForButton = 'black';
    switch(modalType) {
        case 'message':
            img = imgMsg;
            colorForButton = '#00bd98';
            break;
        case 'error':
            img = imgError;
            colorForButton = '#f58181'
    }

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.main}>
                <View style={styles.body}>
                    <View style={styles.boxImg}>
                        <Image style={styles.img} source={img ? img : undefined} />
                    </View>
                    <Text style={styles.msg} >{message}</Text>
                    <Pressable
                        onPress={() => buttonPushed()}
                        style={[styles.button, {backgroundColor: colorForButton}]}
                    >
                        <Text style={styles.text} >OK</Text>
                    </Pressable>

                </View>
            </View>
            
        </Modal>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        width: '80%',
        padding: 20,
        // тень
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity:  0.22,
        shadowRadius: 9.22,
        elevation: 12
    },
    msg: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 16
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white'
    },
    boxImg: {
        width: '70%',
        height: 70
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    button: {
        marginTop: 15,
        borderRadius: 10,
        padding: 4,
        width: '40%'
    }
});

export default ModalMsg;