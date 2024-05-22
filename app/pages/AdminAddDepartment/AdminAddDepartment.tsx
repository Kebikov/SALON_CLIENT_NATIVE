import { View, Text, StyleSheet, Pressable, Image, Button, ScrollView, FlatList } from 'react-native';
import React, { FC, useCallback, useMemo, useRef, useState, useEffect } from 'react';
import WrapperMenu from '@/components/wrappers/WrappersMenu/WrappersMenu';
import DepartmentCartAdmin from '@/components/shared/DepartmentCartAdmin/DepartmentCartAdmin';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import Discription from '@/components/shared/Discription/Discription';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { TypeRootPage } from '@/navigation/navigation.types';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import httpDepartmentService from '@/api/routes/department/service/http.department.service';
import type { IDataDepartmentAndId } from '@/api/routes/department/types/department.dto';
import NotElements from '@/components/shared/NotElements/NotElements';
import { useHookGetDataDepartments } from '@/hooks/useHookGetDataDepartments';


/**
 * @page `Страница с кнопкой добавления департамента.`
 * - С уже добавленными департаментами также.
 */
const AdminAddDepartment: FC = () => {

    const {dataDepartments} = useHookGetDataDepartments();

    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>();


    return (
            <WrapperMenu page='AdminAddDepartment' titlePage='Группы услуг' >
            
                    <View style={styles.main} >
                        <Discription text='Работа с группами услуг. Для обьединения услуг в определенные группы.' marginTop={10}/>
                        <FlatList
                            contentContainerStyle={{ padding: 10, gap: 10 }}
                            data={dataDepartments}
                            renderItem={({item}) => <DepartmentCartAdmin title={item.name} discription={item.discription} icon={item.icon} handlePressFunction={() => {}}/>}
                            keyExtractor={item => String(item.id)}
                            extraData={dataDepartments}
                            ListEmptyComponent={<NotElements title='Нет групп.'/>}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                
                <View style={styles.boxButton}>
                    <ButtonWithIcon 
                        title='добавить группу' 
                        pushButton={() => navigate('AdminAddDepartmentForm', {choice: ''})} 
                        img={require('@/source/img/icon/plus-white.png')} 
                        marginTop={10} 
                    />
                </View>
            </WrapperMenu> 
    );
};


const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: 10
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxButton: {
        paddingHorizontal: 10,
        marginBottom: 5
    }
});

export default AdminAddDepartment;