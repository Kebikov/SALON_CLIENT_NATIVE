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
import { COLOR_ROOT } from '@/data/colors';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';



/**
 * @page `Страница с кнопкой добавления департамента.`
 * - С уже добавленными департаментами также.
 */
const AdminAddDepartment: FC= () => {


    const {dataDepartments} = useHookGetDataDepartments();

    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>();

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['70%'], []);
    const snapeToIndex = (index: number) => bottomSheetRef.current?.snapToIndex(index);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} opacity={.2} />, []
    );



    return (
        <>
            <WrapperMenu page='AdminAddDepartment' titlePage='Группы услуг' >
            
                <View style={styles.main} >
                    <Discription text='Работа с группами услуг. Для обьединения услуг в определенные группы.' marginTop={10}/>
                    <FlatList
                        contentContainerStyle={{ padding: 10, gap: 10 }}
                        data={dataDepartments}
                        renderItem={({item}) => <DepartmentCartAdmin title={item.name} discription={item.discription} icon={item.icon} handlePressFunction={() => snapeToIndex(0)}/>}
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

                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    detached={true}
                    handleIndicatorStyle={{backgroundColor: COLOR_ROOT.MAIN_COLOR}}
                    backgroundStyle={{
                        backgroundColor: COLOR_ROOT.BACKGROUND, 
                        borderRadius: 30
                    }}
                    style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: .4,
                        shadowRadius: 10.32,
                        elevation: 16
                    }}
                    backdropComponent={renderBackdrop}
                >
                    <View style={styles.contentContainer}>
                        <Text>Awesome 🎉</Text>
                        
                    </View>
                </BottomSheet>
        </>
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