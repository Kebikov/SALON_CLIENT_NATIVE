import { View, Text, StyleSheet, Image, Platform, Pressable, Alert, ToastAndroid } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import * as Clipboard from 'expo-clipboard';
import { baseLink } from '@/api/axios/axios.instance/instance';

interface IMasterCartHorizontal {
    name: string; 
    surname: string;
    email: string;
    phone: string;
    picture: string;
    access_ban: number;
    department_name: string | null;
    average_stars: string | null;
}


/**
 * @shared `Горизонтальная карточка мастера.`
 * @param name Имя.
 * @param surname Фамилия.
 * @param email Почта.
 * @param phone Телефон.
 * @param picture Аватарка.
 * @param access_ban Заблокирован или нет.
 * @param department_name Имя группы.
 * @param average_stars Количество звезд, рейтинг.
 */
const MasterCartHorizontal: FC<IMasterCartHorizontal> = ({
    name,
    surname,
    email,
    phone,
    picture,
    access_ban,
    department_name,
    average_stars
}) => {

    const copyToClipboard = async (str: string) => {
        await Clipboard.setStringAsync(str);
        Platform.OS === 'ios'
        ?
        Alert.alert(`${str}`, `Номер скопирован в буфер.`)
        :
        ToastAndroid.show(`Номер скопирован.`, ToastAndroid.SHORT)
    };

    return (
        <View style={styles.main}>
        <View style={styles.cart} >
            <View style={styles.left} >
                <Image 
                    defaultSource={require('@/source/img/plug/plug.jpg')}
                    style={styles.img}
                    source={typeof picture === 'number' ? picture : {uri: `${baseLink}/api/img/get-img/${picture}?type=img_imgMaster`}} 
                />
                <View style={[styles.point, {backgroundColor: access_ban ? 'red' : 'green'}]} />
                <View style={styles.pointBottom} />
            </View>
            <View style={styles.right} >
                <Text style={styles.masterName} >{name} {surname}</Text>
                <Text style={styles.masterUnit} >{department_name}</Text>
                <Text style={styles.masterUnit} >{email}</Text>
                <Pressable onLongPress={() => copyToClipboard(phone)} >
                    <Text style={styles.phone} >{phone}</Text>
                </Pressable>
            </View>
            {
                average_stars
                ?
                <View style={styles.grade}>
                    <View style={styles.gradeBox}>
                        <Image style={styles.gradeImg} source={require('@/source/img/icon/grade.png')} />
                        <Text style={styles.gradeText} >{average_stars.slice(0, 3)}</Text>
                    </View>
                </View>
                :
                null
            }
        </View>
    </View>
    );
};

const styles = StyleSheet.create({

    main: {
        width: '100%',
        height: 100,
        backgroundColor: 'white',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, 
    },
    cart: {
        position: 'relative',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    left: {
        position: 'relative',
        width: 80,
        height: 80
    },
    right: {
        marginLeft: 10,
        flex: 1,
        height: '100%',
        justifyContent: 'center',
    },
    img: {
        aspectRatio: 1/1,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 12
    },
    point: {
        position: 'absolute',
        zIndex: 1,
        bottom: -4,
        right: 6,
        width: 12,
        height: 12,
        borderRadius: 150
    },
    pointBottom: {
        position: 'absolute',
        bottom: -6,
        right: 4,
        width: 16,
        height: 16,
        borderRadius: 150,
        backgroundColor: 'white',
    },
    masterName: {
        fontSize: Platform.OS === 'ios' ? 18 : 15,
        fontWeight: '500',
        color: COLOR_ROOT.BLACK
    },
    masterUnit: {
        fontSize: Platform.OS === 'ios' ? 14 : 12,
        fontWeight: '500',
        color: COLOR_ROOT.MIDDLE_GRAY
    },
    phone: {
        fontSize:Platform.OS === 'ios' ? 16 : 14,
        fontWeight: '500',
        color: COLOR_ROOT.GRAY
    },
    grade: {
        position: 'absolute',
        top: 6,
        right: 6,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 5
    },
    gradeBox: {
        flexDirection: 'row',
        backgroundColor: COLOR_ROOT.PINK,
        marginRight: 5,
        alignItems: 'center',
        paddingHorizontal: Platform.OS === 'ios' ? 6 : 4,
        paddingVertical: Platform.OS === 'ios' ? 4 : 1,
        borderRadius: 4
    },
    gradeImg: {
        width: Platform.OS === 'ios' ? 13 : 12,
        height: Platform.OS === 'ios' ? 13 : 12,
        marginRight: 5
    },
    gradeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600'
    },
});

export default MasterCartHorizontal;