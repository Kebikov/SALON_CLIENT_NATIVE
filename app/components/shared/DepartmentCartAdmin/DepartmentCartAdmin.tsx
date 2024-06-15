import { View, Text, StyleSheet, Image, Platform, Pressable } from 'react-native';
import React, { FC } from 'react';
import { baseLink } from '@/api/axios/axios.instance/instance';
import { COLOR_ROOT } from '@/data/colors';
import Title from '../Title/Title';
import Discription from '../Discription/Discription';


interface IDepartmentCartAdmin {
    title: string;
    discription: string;
    icon: string;
}

/**
 * @shared `Карточка департамента с полным описанием у админа.`
 * @param title Заглавие карточки.
 * @param discription Описание карточки.
 * @param icon Иконка для карточки.
 * @example 
 * <DepartmentCartAdmin 
 *     title={#} 
 *     discription={#} 
 *     icon={#} 
 *     handlePressFunction={#} 
 * />
 */
const DepartmentCartAdmin: FC<IDepartmentCartAdmin> = ({title, discription, icon}) => {

    return (
        <View style={styles.main} >
            <View style={styles.boxImg} >
                <Image style={styles.img} source={{uri: `${baseLink}/api/img/get-img/${icon}?type=icon-group`}} />
            </View>
            <View style={styles.boxText}>
                <Title text={title} location='left' fontSize={16} />
                <Discription text={discription} fontSize={13}/>
            </View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: 'white',

        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: Platform.OS === 'ios' ? .2 : .3,
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
        resizeMode: 'contain',
    }
});

export default DepartmentCartAdmin;