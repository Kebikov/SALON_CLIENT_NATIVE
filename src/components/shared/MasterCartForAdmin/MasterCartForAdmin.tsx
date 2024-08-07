import { View, Text, StyleSheet, Image, Platform, Pressable, Alert, ToastAndroid } from 'react-native';
import React, { FC } from 'react';
import { baseLink } from '@/api/axios/axios.instance/instance';
import { COLOR_ROOT } from '@/data/colors';
import * as Clipboard from 'expo-clipboard';
import ButtonSwipeable from '@/components/widgets/ButtonSwipeable/ButtonSwipeable';
import { useHookRouter } from '@/helpers/router/useHookRouter';
import httpMasterService from '@/api/routes/master/service/http.master.service';
import * as Haptics from 'expo-haptics';

import type { IMasterFind } from '@/api/routes/master/types/master.dto';


interface IMasterCartForAdmin {
    master: IMasterFind;
    setMasters: React.Dispatch<React.SetStateAction<IMasterFind[]>>
}


/**
 * @shared `Карточка мастера у админа.`
 */
const MasterCartForAdmin: FC<IMasterCartForAdmin> = ({master, setMasters}) => {

    const {id, name, phone, picture, access_ban, department_name, email, surname, average_stars, description, id_department} = master;
    const {appRouter} = useHookRouter();

    const copyToClipboard = async (str: string) => {
        await Clipboard.setStringAsync(str);
        Platform.OS === 'ios'
        ?
        Alert.alert(`${str}`, `Номер скопирован в буфер.`)
        :
        ToastAndroid.show(`Номер скопирован.`, ToastAndroid.SHORT)
    };

    const deleteMaster = () => {
        Haptics.selectionAsync()
        Alert.alert(
            'Удалить мастера ?', 'После нажатия удалить, мастер будет удален.',
            [
                {
                    text: 'удалить',
                    onPress: async () => {
                        await httpMasterService.DELETE_deleteMaster(id);
                        setMasters(state => state.filter(item => item.id !== id));
                    },
                    style: 'destructive',
                },
                {
                    text: 'отмена',
                    onPress: () => {},
                    style: 'cancel',
                },
            ]
        );
    };

    const editMaster = () => {
        appRouter.navigate({
            pathname: '/admin/adminEditMaster/[id]', 
            params: {id, name, surname, description, phone, picture, access_ban, id_department, email, department_name}
        });
    };

    const addService = () => {
        appRouter.navigate({pathname: '/admin/adminAddServiceForMaster/[id]', 
            params: {
                id: String(id),
                name,
                picture, 
                department_name: department_name ? department_name : undefined,
                surname
            }
        });
    }

    return (
        <ButtonSwipeable
            totalButton={3}

            onPressButton1={() => addService()}
            colorButton1={COLOR_ROOT.BUTTON_COLOR_GREEN}
            iconForButton1={require('@/source/img/icon/plus-white.png')}

            onPressButton2={() => editMaster()}
            iconForButton2={require('@/source/img/icon/edit-btn.png')}
            colorButton2={COLOR_ROOT.BUTTON_COLOR_YELLOW}

            onPressButton3={() => deleteMaster()}
            iconForButton3={require('@/source/img/icon/del-btn.png')}
            colorButton3={COLOR_ROOT.BUTTON_COLOR_RED}
        >
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
        </ButtonSwipeable>
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

export default MasterCartForAdmin;