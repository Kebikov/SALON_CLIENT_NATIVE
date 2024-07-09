import { View, StyleSheet, FlatList, Text, Alert, Pressable, Image, Platform } from 'react-native';
import React, { FC, useRef, useState } from 'react';
import WrapperMenu from '@/components/wrappers/WrappersMenu/WrappersMenu';
import ServiceCart from '@/components/shared/ServiceCart/ServiceCart';
import ButtonWithIcon from '../../components/shared/ButtonWithIcon/ButtonWithIcon';
import { useHookRouter } from '@/helpers/router/useHookRouter';
import httpServiceService from '@/api/routes/service/service/http.service.service';
import ButtonSwipeable from '@/components/widgets/ButtonSwipeable/ButtonSwipeable';
import { useHookCheckErrorResponce } from '@/hooks/useHookCheckErrorResponce';
import { COLOR_ROOT } from '@/data/colors';
import { baseLink } from '@/api/axios/axios.instance/instance';
import { useHookGetDataServices } from '@/hooks/GET/useHookGetDataServices';
import { useHookGetDataDepartments } from '@/hooks/GET/useHookGetDataDepartments';
import BottomModalSheet from '@/components/wrappers/BottomModalSheet/BottomModalSheet';
import BottomModalSheetWithDepartment from '@/components/widgets/BottomModalSheetWithDepartment/BottomModalSheetWithDepartment';
import ModalSheetLineDepartment from '@/components/shared/ModalSheetLineDepartment/ModalSheetLineDepartment';
import type { ServiceDTOAndDepartmentName } from '@/api/routes/service/types/service.types';
import type { IRefBottomModalSheet } from '@/components/wrappers/BottomModalSheet/types';
import type { IDataDepartmentAndId } from '@/api/routes/department/types/department.dto';


/**
 * @page `Страница с услугами и кнопкой добавления услуги.`
 * @example 
 * @returns {JSX.Element}
 */
const AdminService: FC = () => {

    const bottomSheetRef = useRef<IRefBottomModalSheet>(null);
    const openList = () => bottomSheetRef.current?.openModal();
    const closeList = () => bottomSheetRef.current?.closeModal();

    const {dataDepartments} = useHookGetDataDepartments();
    const {services, setServices} = useHookGetDataServices();
    const [curentFilter, setCurentFilter] = useState<string>('Все услуги.');
    const {isMessage} = useHookCheckErrorResponce();
    const {appRouter} = useHookRouter();
    
    const deleteService = (id: number, title: string) => {
        Alert.alert(
            'Удалить группу ?',
            `После нажатия удалить, группа "${title}" будет удалена.`,
            [
                {
                    text: 'отмена',
                    onPress: () => {},
                    style: 'cancel',
                },
                {
                    text: 'удалить',
                    onPress: async () => {
                        const result = await httpServiceService.DELETE_deleteServiceById(id, title);
                        const newServices = services.filter((item) => (item.id !== id));
                        if(result) {
                            setServices(newServices);
                            isMessage(result);
                        }
                    },
                    style: 'destructive',
                }
            ]
        );
    }

    const editService = (item: ServiceDTOAndDepartmentName) => {
        appRouter.navigate({pathname: '/admin/adminEditService/[id]', params: {...item}})
    }

    let sheetDepartments: IDataDepartmentAndId[] = [
        {
            id: 0, name: 'Все услуги.', discription: '', icon: 'icon все услуги'
        },
        {
            id: 0, name: 'Нет группы.', discription: '', icon: 'icon нет группы'
        }
    ];

    sheetDepartments = [ ...sheetDepartments, ...dataDepartments];

    const filterService = services.filter(item => {
            if(curentFilter === 'Все услуги.') {
                return item;
            }

            if(curentFilter === 'Нет группы.' && item.name === null) {
                return item;
            }

            if(item.name === curentFilter) {
                return item;
            }
        }  
    );

    const arr = [{name: 'sdf'}, {name: 'sdff'}]

    return (
        <>
            <WrapperMenu titlePage='Услуги' imgFilter={require('@/source/img/icon/filter_white.png')} handlePessImgFilter={() => openList()} >
                <View style={styles.main} >
                    {
                        services.length > 0
                        ?
                        <FlatList
                            contentContainerStyle={{ gap: 10, paddingBottom: 10 }}
                            data={filterService}
                            renderItem={ 
                                ({item}) => (
                                    <ButtonSwipeable 
                                        totalButton={2}

                                        onPressButton1={() => editService(item)}
                                        colorButton1={COLOR_ROOT.BUTTON_COLOR_YELLOW}
                                        iconForButton1={require('@/source/img/icon/edit-btn.png')}

                                        onPressButton2={() => deleteService(item.id, item.title)}
                                        colorButton2={COLOR_ROOT.BUTTON_COLOR_RED}
                                        iconForButton2={require('@/source/img/icon/del-btn.png')}

                                        paddingForButton={23}
                                    >
                                        <ServiceCart 
                                            title={item.title} 
                                            department={item.name ? item.name : 'нет группы'} 
                                            time={item.time} 
                                            price={item.price} 
                                            img={item.img} 
                                            borderRadius={0}
                                        />
                                    </ButtonSwipeable>
                                ) 
                            }
                            keyExtractor={item => String(item.id)}
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                            extraData={[services, curentFilter]}
                            ListEmptyComponent={<View><Text>Нет элементов.</Text></View>}
                        />
                        :
                        null
                    }
                </View>
                <View style={styles.boxButton}>
                    <ButtonWithIcon 
                        title='добавить услугу'
                        pushButton={() => {
                            appRouter.navigate('/admin/adminAddService');
                        }} 
                        img={require('@/source/img/icon/plus-white.png')} 
                        marginTop={10} 
                    />
                </View>
            </WrapperMenu>

            {/*//* Модальное нижнее окно с группами*/}
            <BottomModalSheetWithDepartment
                bottomSheetRef={bottomSheetRef}
                sheetDepartments={sheetDepartments}
                handlePress={(item) => {
                    setCurentFilter(item.name);
                    closeList();
                }}
            />
        </>
    );
};


const styles = StyleSheet.create({
    main: { flex: 1, paddingHorizontal: 5, marginTop: 5 },
    boxButton: { paddingHorizontal: 10, marginBottom: 5 }
});


export default AdminService;