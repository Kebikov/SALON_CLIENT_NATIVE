import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React, { FC } from 'react';
import { IMasterFind } from '@/api/routes/master/types/master.dto';
import { baseLink } from '@/api/axios/axios.instance/instance';
import { COLOR_ROOT } from '@/data/colors';


interface IMasterJust {
    master: IMasterFind;
    handlePress: () => void;
}

/**
 * @component `Простая карточка Мастера.`
 * @returns {JSX.Element}
 */
const MasterJust: FC<IMasterJust> = ({
    master,
    handlePress
}) => {

    console.log('Master = ', master);

    if(!master) return;

    return (
        <Pressable
            style={styles.main}
            onPress={() => handlePress()}
        >
            <View style={styles.conteiner} >
                <View style={styles.boxImg}>
                    <Image 
                        defaultSource={require('@/source/img/plug/plug.jpg')}
                        style={[styles.img, {borderRadius: 12}]}
                        source={{uri: `${baseLink}/api/img/get-img/${master.picture}?type=img_imgMaster`}}
                    />
                </View>
                <View style={styles.boxRight} >
                    <View style={styles.boxInfo} >
                        <Text style={styles.name} >{`${master.surname} ${master.name}`}</Text>
                        {
                            master.department_name 
                            ?
                            <Text style={styles.departmentName} >{master.department_name}</Text>
                            :
                            null
                        }
                    </View>
                    <View style={styles.arrow}>
                        <Image 
                            style={[{width: 25, height: 25}]}
                            source={require('@/source/img/icon-menu/arrow-grey.png')} 
                        />
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    main: {
        width: '100%',
        alignItems: 'center',
        height: 44,
        marginTop: 10
    },
    conteiner: {
        width: '90%',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 17,
        padding: 5,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, 
    },
    boxRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    boxImg: {
        width: 44,
        height: 44
    },
    img: {
        objectFit: 'cover',
        width: '100%',
        height: '100%'
    },
    boxInfo: {
        marginLeft: 10,
        justifyContent: 'center'
    },
    name: {
        fontSize: 15,
        fontWeight: '500',
        color: COLOR_ROOT.BLACK
    },
    departmentName: {
        fontSize: 12,
        color: COLOR_ROOT.MIDDLE_GRAY
    },
    arrow: {
        width: 40,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MasterJust;