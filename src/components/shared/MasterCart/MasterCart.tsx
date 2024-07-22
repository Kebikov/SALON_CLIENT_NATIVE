import { View, Text, StyleSheet, ImageBackground, Image, Platform } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import { baseLink } from '@/api/axios/axios.instance/instance';
import Animated, {ZoomIn} from 'react-native-reanimated';


interface IMasterCart {
    /**
     * Имя мастера.
     */
    masterName: string;
    /**
     * Специализация мастера.
     */
    masterUnit: string;
    /**
     * Рейтинг мастера.
     */
    grade: number;
    /**
     * Фото мастера.
     */
    img: number | string;
}


/**
 * @shared Мини-Карточка мастера.
 * @param masterName Имя мастера.
 * @param masterUnit Специализация мастера.
 * @param img Фото мастера.
 * @param grade Рейтинг мастера.
 */
const MasterCart: FC<IMasterCart> = ({
    masterName, 
    masterUnit, 
    img, 
    grade
}) => {

    return (
        <Animated.View style={[styles.main]} entering={ZoomIn.duration(500).delay(300)} >
            <View style={styles.box} >
                <View style={styles.boxBg} >
                    <ImageBackground style={styles.imageBackground} source={typeof img === 'number' ? img : {uri: `${baseLink}/api/img/get-img/${img}?type=img_imgMaster`}} >
                        <View style={styles.grade}>
                            <View style={styles.gradeBox}>
                                <Image style={styles.gradeImg} source={require('@/source/img/icon/grade.png')}/>
                                <Text style={styles.gradeText} >{grade}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <Text style={styles.masterName} >{masterName}</Text>
                <Text style={styles.masterUnit} >{masterUnit}</Text>
            </View>
        </Animated.View>
    );
};


const styles = StyleSheet.create({
    main: {
        width: Platform.OS === 'ios' ? 145 : 135,
        height: Platform.OS === 'ios' ? 182 : 172,
        borderRadius: 16,
        padding: 8,
        backgroundColor: 'white',
        // shadows
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity:  0.18,
        shadowRadius: 4.59,
        elevation: 5,
    },
    box: {
        flex: 1
    },
    boxBg: {
        width: '100%',
        height: Platform.OS === 'ios' ? 120 : 110,
        borderRadius: 8,
        overflow: 'hidden'
    },
    imageBackground: {
        flex: 1
    },
    grade: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 5
    },
    gradeBox: {
        flexDirection: 'row',
        backgroundColor: COLOR_ROOT.PINK,
        marginRight: 5,
        alignItems: 'center',
        paddingHorizontal: 4,
        paddingVertical: 1,
        borderRadius: 4
    },
    gradeImg: {
        width: 12,
        height: 12,
        marginRight: 5
    },
    gradeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600'
    },
    masterName: {
        color: COLOR_ROOT.BLACK,
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        fontWeight: '500',
        lineHeight: 17,
        paddingLeft: 5,
        paddingTop: 7
    },
    masterUnit: {
        color: COLOR_ROOT.LIGHT_ICON,
        fontSize: Platform.OS === 'ios' ? 14 : 12,
        fontWeight: '400',
        lineHeight: Platform.OS === 'ios' ? 17 : 14,
        paddingLeft: 5,
    }
});

export default MasterCart;