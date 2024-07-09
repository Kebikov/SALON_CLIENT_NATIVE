import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { FC } from 'react';
import BottomModalSheet from '@/components/wrappers/BottomModalSheet/BottomModalSheet';
import ModalSheetLineDepartment from '@/components/shared/ModalSheetLineDepartment/ModalSheetLineDepartment';
import { COLOR_ROOT } from '@/data/colors';

import type { IRefBottomModalSheet } from '@/components/wrappers/BottomModalSheet/types';
import type { IDataDepartmentAndId } from '@/api/routes/department/types/department.dto';


interface IBottomModalSheetWithDepartment<T> {
    bottomSheetRef: React.RefObject<IRefBottomModalSheet>;
    handlePress: (item: T) => void; 
    sheetDepartments: T[];
    typeModal?: 'filter' | 'select';
}


/**
 * @widgets `Нижнее модальное окно с группами.`
 * @param bottomSheetRef Ref для модального окна.
 * @param handlePress Функция обработки нажатия пункта в FlatList.
 * @param sheetDepartments Массив групп.
 * @optional
 * @param typeModal ? Тип модального окна(для фильтрации групп, для выбора группы) 
 */
const BottomModalSheetWithDepartment = <T extends IDataDepartmentAndId>({
    bottomSheetRef,
    handlePress,
    sheetDepartments,
    typeModal = 'select'
}: IBottomModalSheetWithDepartment<T>) => {

    let expectedLenght: number;
    let currentTitle: string;

    switch(typeModal) {
        case 'select':
            expectedLenght = 0;
            currentTitle = 'Выбор группы'
            break;
        case 'filter': 
            expectedLenght = 2;
            currentTitle = 'Фильтр по группе'
            break;
        default:
            expectedLenght = 0;
            currentTitle = ''
            break;
    }

    return (
        <BottomModalSheet 
            ref={bottomSheetRef} 
            heightProcent={50} 
            isWithScrooll={false}
        >
            <View style={styles.sheet_header}>
                <Text style={styles.sheet_title}>{currentTitle}</Text>
            </View>
            <View style={styles.main_sheet} >
                {
                    sheetDepartments.length > expectedLenght
                    ?
                    <FlatList
                        contentContainerStyle={{ gap: 0, paddingBottom: 10 }}
                        data={sheetDepartments}
                        renderItem={ 
                            ({item, index}) => (
                                <ModalSheetLineDepartment 
                                    index={index} 
                                    item={item} 
                                    handlePress={(item: T) => handlePress(item)}
                                />
                            ) 
                        }
                        keyExtractor={item => 'name' in item && typeof item.name === 'string' ? item.name : 'key' }
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                    />
                    :
                    null
                }
            </View>
        </BottomModalSheet>
    );
};

const styles = StyleSheet.create({
    main_sheet: {
        flex: 1, padding: 10
    },
    sheet_header: {
        backgroundColor: COLOR_ROOT.MAIN_COLOR, 
        paddingVertical: 5
    },
    sheet_title: {
        textAlign: 'center', 
        fontSize: 16, 
        fontWeight: '500', 
        color: 'white'
    }
});


export default BottomModalSheetWithDepartment;