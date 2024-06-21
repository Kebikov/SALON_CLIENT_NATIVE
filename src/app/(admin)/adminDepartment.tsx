import { COLOR_ROOT } from '@/data/colors';
import { View, StyleSheet, Platform, Text, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React, { FC, useRef, useState } from 'react';
import WrapperMenu from '@/components/wrappers/WrappersMenu/WrappersMenu';
import DepartmentCartAdmin from '@/components/shared/DepartmentCartAdmin/DepartmentCartAdmin';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import Discription from '@/components/shared/Discription/Discription';
import NotElements from '@/components/shared/NotElements/NotElements';
import { useHookGetDataDepartments } from '@/hooks/useHookGetDataDepartments';
import ButtonSwipeable from '@/components/widgets/ButtonSwipeable/ButtonSwipeable';
import BottomModalSheet from '@/components/wrappers/BottomModalSheet/BottomModalSheet';
import httpDepartmentService from '@/api/routes/department/service/http.department.service';
import { IRefBottomModalSheet } from '@/components/wrappers/BottomModalSheet/types';
import { useHookCheckErrorResponce } from '@/hooks/useHookCheckErrorResponce';
import { useHookRouter } from '@/helpers/router/useHookRouter';
import { router } from 'expo-router';


interface IDelDepartment {
    id: number;
    name: string;
}


/**
 * @page `Страница с группами и кнопкой добавления группы.`
 */
const AdminDepartment: FC= () => {

    const {appRouter} = useHookRouter();
    /**
     * @param currentDepartment Текушяя удаляемая группа.
     */
    const [currentDepartment, setCurrentDepartment] = useState<IDelDepartment | null>(null);
    const {dataDepartments, setDataDepartments} = useHookGetDataDepartments();

    const {isMessage} = useHookCheckErrorResponce();

    const refModalSheet = useRef<IRefBottomModalSheet>(null);
    const openModal = () => refModalSheet.current?.openModal();
    const closeModal = () => refModalSheet.current?.closeModal();

    const goEditDepartment = (id: number) => {
        
        router.navigate({pathname: '(admin)/[idEditDepartment]', params: {idEditDepartment: id}});
    }

    const openModalDeleteDepartment = (id: IDelDepartment) => {
        setCurrentDepartment(id);
        openModal();
    }

    const deleteDepartment = async () => {

        if(!currentDepartment?.id) return;
        const result = await httpDepartmentService.DELETE_deleteDepartment(currentDepartment.id);
        if(!result) return;

        closeModal();
        isMessage(result);
        const filterData = dataDepartments.filter((item) => item.id !== currentDepartment.id);
        setDataDepartments(filterData);
    }

    return (
        <>
            <WrapperMenu titlePage='Группы услуг' >
                <View style={styles.main} >
                    <Discription text='Работа с группами услуг. Для обьединения услуг в определенные группы.' marginTop={10}/>
                    {
                        dataDepartments.length > 0
                        ?
                        <FlatList
                            contentContainerStyle={{gap: 10, margin: Platform.OS === 'ios' ? 0 : 5, paddingVertical: 5}}
                            data={dataDepartments}
                            scrollEventThrottle={16}
                            renderItem={({item}) =>  
                                <ButtonSwipeable
                                    totalButton={2}
                                    paddingForButton={30}
                                    onPressButton1={() => goEditDepartment(item.id)}
                                    colorButton1={COLOR_ROOT.BUTTON_COLOR_YELLOW}
                                    iconForButton1={require('@/source/img/icon/edit-btn.png')}

                                    onPressButton2={() => openModalDeleteDepartment({id: item.id, name: item.name})}
                                    colorButton2={COLOR_ROOT.BUTTON_COLOR_RED}
                                    iconForButton2={require('@/source/img/icon/del-btn.png')}
                                >
                                    <DepartmentCartAdmin 
                                        title={item.name} 
                                        discription={item.discription} 
                                        icon={item.icon} 
                                    />
                                </ButtonSwipeable>
                            }
                            keyExtractor={item => String(item.id)}
                            extraData={dataDepartments}
                            ListEmptyComponent={<NotElements title='Вы не добавили ни одной группы.'/>}
                            showsVerticalScrollIndicator={false}
                        />
                        :
                        null
                    }
                </View>
                
                <View style={styles.boxButton}>
                    <ButtonWithIcon 
                        title='добавить группу' 
                        pushButton={() => appRouter.navigate('(admin)/adminAddDepartment')} 
                        img={require('@/source/img/icon/plus-white.png')} 
                        marginTop={10} 
                    />
                </View>
                <BottomModalSheet ref={refModalSheet} heightProcent={40} isWithScrooll={false} backgroundColorBody={COLOR_ROOT.MAIN_COLOR} >
                    <View style={styles.allowBody}>
                        <Text style={styles.allowTitle}>Вы хотите удалить группу ?</Text>
                        <Text style={styles.allowSubTitle}>Вы удаляете группу {currentDepartment?.name}, все услуги добавленые в данную группу, а также сотрудники будут без группы.</Text>
                        <View style={styles.allow_button_group}>
                            <Pressable style={[styles.allow_button, {backgroundColor: COLOR_ROOT.PINK}]} onPress={() => deleteDepartment()} >
                                <Text style={styles.allow_button_text} >удалить группу</Text>
                            </Pressable>
                            <Pressable style={[styles.allow_button, {marginTop: 10}]} onPress={() => closeModal()} >
                                <Text style={styles.allow_button_text} >отмена</Text>
                            </Pressable>
                        </View>
                    </View>
                </BottomModalSheet>
            </WrapperMenu> 
        </>
    );
};


const styles = StyleSheet.create({
    main: { flex: 1, paddingHorizontal: 15 },
    boxButton: { paddingHorizontal: 10, marginBottom: 5 },
    allowBody: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 },
    allowTitle: { fontSize: 18, fontWeight: '500', color: 'white'},
    allowSubTitle: { fontSize: 14, fontWeight: '400', color: COLOR_ROOT.BACKGROUND_INPUT, marginTop: 10, textAlign: 'center' },
    allow_button_group: { alignItems: 'center', marginTop: 20 },
    allow_button: { paddingHorizontal: 40, paddingVertical: 10, borderRadius: 18 },
    allow_button_text: {color: 'white', fontSize: 16, fontWeight: '500'}
});

export default AdminDepartment;