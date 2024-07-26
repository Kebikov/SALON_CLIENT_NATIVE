import { View, Text, StyleSheet, Pressable, Platform, Image } from 'react-native';
import React, { FC } from 'react';
import { baseLink } from '@/api/axios/axios.instance/instance';
import { COLOR_ROOT } from '@/data/colors';

import type { DepartmentDTO } from "@/api/routes/department/types/department.types";


interface IModalSheetLineDepartment<T> {
    index: number;
    handlePress: (item: T) => void; 
    item: T;
}


/**
 * @shared `Строка с группой в модальном окне.`
 * @param index Номер позиции элемента.
 * @param handlePress Функци обработки нажатия элемента.
 * @param item Обьект группы.
 */
const ModalSheetLineDepartment = <T extends Omit<DepartmentDTO, 'id'>>({
    index,
    handlePress,
    item
}: IModalSheetLineDepartment<T>) => {

    return (
        <Pressable
            style={index === 0 ? [styles.sheet_button_first, styles.sheet_button] : styles.sheet_button}
            onPress={() => handlePress(item)}
        >
            <View style={styles.sheet_box_img} >
                {
                    'icon' in item
                    ?
                    <Image 
                        style={styles.sheet_img} 
                        source={
                            item.icon === 'icon все услуги'
                            ?
                            require('@/source/img/icon/all.png')
                            :
                            item.icon === 'icon нет группы'
                            ?
                            require('@/source/img/icon/not.png')
                            :
                            item.icon
                            ?
                            {uri: `${baseLink}/api/img/get-img/${item.icon}?type=icon_icon-group`}
                            :
                            null
                        } 
                    />
                    :
                    null
                }
            </View>
            {
                'name' in item && typeof item.name === 'string' 
                ?
                <Text style={styles.shet_text}>{item.name}</Text>
                :
                null
            }
            
        </Pressable>
    );
};

const COLOR_LINE = 'rgba(0, 0, 0, .3)';

const styles = StyleSheet.create({
    sheet_button_first: { 
        borderTopColor: COLOR_LINE, 
        borderTopWidth: 1
    },
    sheet_button: {
        paddingVertical: 5, 
        borderBottomColor: COLOR_LINE, 
        borderBottomWidth: 1, 
        flexDirection: 'row',
        alignItems: 'center'
    },
    shet_text: {
        fontSize: Platform.OS === 'ios' ? 16 : 15,
        marginLeft: 10
    },
    sheet_box_img: {
        width: Platform.OS === 'ios' ? 32 : 30, 
        height: Platform.OS === 'ios' ? 32 : 30, 
        borderRadius: 200, 
        borderColor: COLOR_ROOT.MAIN_COLOR, 
        borderWidth: 1, 
        padding: 4
    },
    sheet_img: {resizeMode: 'contain', width: '100%', height: '100%'}
});

export default ModalSheetLineDepartment;