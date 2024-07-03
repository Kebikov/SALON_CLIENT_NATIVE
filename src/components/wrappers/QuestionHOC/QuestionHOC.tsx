import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { FC } from 'react';
import { useAppDispatch } from '@/redux/store/hooks';
import { setAppModalObject } from '@/redux/slice/modal.slice';
import { useDispatch } from 'react-redux';


interface IQuestionHOC {
    children: JSX.Element | JSX.Element[];
    title: string; 
    discription: string;
    marginTop?: number;
}


/**
 * @wrappers `Обертка с добавлением вопроса, для описания заголовка.`
 * @param children Принимаемый элемент JSX.
 * @param title Заголовок для опсания.
 * @param discription Текст описания.
 * @param marginTop ? Отступ с верху.
 * @example 
    <QuestionHOC
        title='Кокойто заголовок.'
        discription='Какоето описание.'
    >
        <Title text='Группа' location='left'/>
    </QuestionHOC>
 * @returns {JSX.Element}
 */
const QuestionHOC: FC<IQuestionHOC> = ({children, title, discription, marginTop = 0}) => {

    const dispatch = useDispatch();

    const openModal = () => {
        dispatch(setAppModalObject({
            modalVisible: true,
            message: title,
            discription,
            modalType: 'question'
        }));
    }

    return (
        <View 
            style={[styles.main, {marginTop}]}
        >
            <View style={styles.boxChildren} >
                {children}
            </View>
            <Pressable 
                style={styles.boxImg} 
                onPress={() => openModal()}
            >
                <Image style={styles.img} source={require('@/source/img/icon/question.png')}/>
            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
    main: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    boxImg: {
        width: 23,
        height: 23,
        marginLeft: 5,
        transform: [
            {translateY: 1}
        ]
    },
    img: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%'
    },
    boxChildren: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});


export default QuestionHOC;