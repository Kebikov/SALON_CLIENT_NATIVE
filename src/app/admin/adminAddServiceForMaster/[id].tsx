import { View, StyleSheet, Text, Alert, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React, { FC, useRef, useState } from 'react';
import WrapperScroll from '@/components/wrappers/WrapperScroll/WrapperScroll';
import ServiceCart from '@/components/shared/ServiceCart/ServiceCart';
import { useHookRouter } from '@/helpers/router/useHookRouter';
import httpServiceService from '@/api/routes/service/service/http.service.service';
import httpMasterService from '@/api/routes/master/service/http.master.service';
import ButtonSwipeable from '@/components/widgets/ButtonSwipeable/ButtonSwipeable';
import { useHookCheckErrorResponce } from '@/hooks/useHookCheckErrorResponce';
import { COLOR_ROOT } from '@/data/colors';
import { useHookGetDataServices } from '@/hooks/GET/useHookGetDataServices';
import { useHookGetDataDepartments } from '@/hooks/GET/useHookGetDataDepartments';
import BottomModalSheetWithDepartment from '@/components/widgets/BottomModalSheetWithDepartment/BottomModalSheetWithDepartment';
import { useLocalSearchParams } from 'expo-router';
import { useHookGetServiceOfMaster } from '@/hooks/GET/useHookGetServiceOfMaster';

import type { ServiceDTOAndDepartmentName } from '@/api/routes/service/types/service.types';
import type { IRefBottomModalSheet } from '@/components/wrappers/BottomModalSheet/types';
import type { DepartmentDTO } from "@/api/routes/department/types/department.types";

interface ISetButton {
    color: string;
    text: string;
    handlePressButton: Function;
}


/**
 * @page `Страница добавления/удаления услуг мастера.`
 */
const AdminAddServiceForMaster: FC = () => {

    let { id } = useLocalSearchParams<{id: string}>();
    if(!id) return;

    const bottomSheetRef = useRef<IRefBottomModalSheet>(null);
    const openList = () => bottomSheetRef.current?.openModal();
    const closeList = () => bottomSheetRef.current?.closeModal();

    const {serviceOfMaster, setServiceOfMaster} = useHookGetServiceOfMaster(Number(id));
    const {dataDepartments} = useHookGetDataDepartments();
    const {services, setServices} = useHookGetDataServices();
    const [curentFilter, setCurentFilter] = useState<string>('Все услуги.');

    let sheetDepartments: DepartmentDTO[] = [
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

            if(curentFilter === 'Нет группы.' && item.department_name === null) {
                return item;
            }

            if(item.department_name === curentFilter) {
                return item;
            }
        }  
    );

    /**
     * `Установить настройки кнопки.`
     */
    const setSettingsButton = (item: ServiceDTOAndDepartmentName): ISetButton => {
        if(serviceOfMaster === null || !serviceOfMaster.some(el => el.id === item.id)) {
            return {
                color: COLOR_ROOT.BUTTON_COLOR_GREEN,
                text: 'добавить',
                handlePressButton: async () => {
                    await httpMasterService.POST_masterAndService('push', Number(id), item.id);
                }
            }
        } else {
            return {
                color: COLOR_ROOT.BUTTON_COLOR_RED,
                text: 'убрать',
                handlePressButton: async () => {
                    await httpMasterService.POST_masterAndService('remove', Number(id), item.id);
                }
            }
        }
    } 



    return (
        <>
            <WrapperScroll titlePage='Добавление услуг' isScrollEnabled={false} imgFilter={require('@/source/img/icon/filter_white.png')} handlePessImgFilter={() => openList()} >
                <View style={styles.main} >
                    {
                        services.length > 0
                        ?
                        <FlatList
                            contentContainerStyle={{ gap: 10, paddingBottom: 10 }}
                            data={filterService}
                            renderItem={ 
                                ({item}) => (
                                    <ServiceCart
                                        service={item}
                                        borderRadius={0}
                                        textButton={setSettingsButton(item).text}
                                        backgroundColorButton={setSettingsButton(item).color}
                                        handlePressButton={setSettingsButton(item).handlePressButton}
                                    />
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
            </WrapperScroll>

            {/*//* Модальное нижнее окно с группами*/}
            <BottomModalSheetWithDepartment
                bottomSheetRef={bottomSheetRef}
                sheetDepartments={sheetDepartments}
                typeModal='filter'
                handlePress={(item) => {
                    setCurentFilter(item.name);
                    closeList();
                }}
            />
        </>
    );
};


const styles = StyleSheet.create({
    main: { flex: 1, paddingHorizontal: 15, marginTop: 5 },
    boxButton: { paddingHorizontal: 10, marginBottom: 5 }
});


export default AdminAddServiceForMaster;