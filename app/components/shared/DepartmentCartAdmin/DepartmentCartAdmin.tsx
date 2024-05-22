import { View, Text, StyleSheet, Image, Platform, Pressable } from 'react-native';
import React, { FC } from 'react';
import { baseLink } from '@/api/axios/axios.instance/instance';
import { COLOR_ROOT } from '@/data/colors';
import { LinearGradient } from 'expo-linear-gradient';
import Title from '../Title/Title';
import Discription from '../Discription/Discription';


interface IDepartmentCartAdmin {
    handlePressFunction: Function;
    title: string;
    discription: string;
    icon: string;
}

/**
 * @shared `Карточка департамента с полным описанием у админа.`
 * @param title Заглавие карточки.
 * @param discription Описание карточки.
 * @param icon Иконка для карточки.
 * @param handlePressFunction Функция сработаюшая при нажатии.
 * @example 
 * <DepartmentCartAdmin 
 *     title={#} 
 *     discription={#} 
 *     icon={#} 
 *     handlePressFunction={#} 
 * />
 */
const DepartmentCartAdmin: FC<IDepartmentCartAdmin> = ({title, discription, icon, handlePressFunction}) => {

    return (
        <Pressable 
            style={styles.main} 
            onPress={() => handlePressFunction()}
        >
            <View style={styles.boxImg} >
                <Image style={styles.img} source={{uri: `${baseLink}/api/img/get-img/${icon}?type=icon-group`}} />
            </View>
            <View style={styles.boxText}>
                <Title text={title} location='left' fontSize={16} />
                <Discription text={discription} fontSize={13}/>
            </View>
            <View style={styles.boxArrow}>
                <Image style={styles.img} source={require('@/source/img/icon-menu/arrow.png')} />
            </View>
        </Pressable>
        
    );
};

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 10,

        borderRadius: 15,
        backgroundColor: 'white',

        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: .3,
        shadowColor: '#000',
        shadowRadius: 4,
        elevation: 3
    },
    boxImg: {
        width: 60,
        height: 60,
        padding: 10,
        borderRadius: 150,
        borderWidth: 1,
        borderColor: COLOR_ROOT.MAIN_COLOR
    },
    boxText: {
        marginLeft: 10,
        flex: 1
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    boxArrow: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default DepartmentCartAdmin;