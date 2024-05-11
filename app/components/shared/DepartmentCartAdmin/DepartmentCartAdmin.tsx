import { View, Text, StyleSheet, Image } from 'react-native';
import React, { FC } from 'react';
import { baseLink } from '@/api/axios/axios.instance/instance';
import { COLOR_ROOT } from '@/data/colors';
import { LinearGradient } from 'expo-linear-gradient';
import Title from '../Title/Title';
import Discription from '../Discription/Discription';


/**
 * @shared `Карточка департамента с полным описанием у админа.`
 * @example <DepartmentCartAdmin/>
 * @returns {JSX.Element}
 */
const DepartmentCartAdmin: FC = () => {

    return (
        <View style={styles.main} >
            <View style={styles.boxImg} >
                <Image style={styles.img} source={{uri: `${baseLink}/api/img/get-img/${'23.png'}?type=icon-group`}} />
            </View>
            <View style={styles.boxText}>
                <Title text='Группа' location='left' />
                <Discription text='Тут описание отдела...' />
            </View>
            <View style={styles.boxArrow}>
                <Image style={styles.img} source={require('@/source/img/icon-menu/arrow.png')} />
            </View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
        padding: 10,

        borderRadius: 45,
        backgroundColor: 'white',

        shadowOffset: { width: 7, height: 7 },
        shadowOpacity: 1,
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
        //backgroundColor: 'red',
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