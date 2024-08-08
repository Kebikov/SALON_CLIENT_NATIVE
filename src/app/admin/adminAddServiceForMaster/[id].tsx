import { View, StyleSheet, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React, { FC, useRef } from 'react';
import WrapperScroll from '@/components/wrappers/WrapperScroll/WrapperScroll';
import ServiceCart from '@/components/shared/ServiceCart/ServiceCart';
import httpMasterService from '@/api/routes/master/service/http.master.service';
import { COLOR_ROOT } from '@/data/colors';
import BottomModalSheetWithDepartment from '@/components/widgets/BottomModalSheetWithDepartment/BottomModalSheetWithDepartment';
import { useLocalSearchParams } from 'expo-router';
import { useHookGetServiceOfMaster } from '@/hooks/GET/useHookGetServiceOfMaster';
import VibrationApp from '@/helpers/helpersForComponents/vibration/VibrationApp';
import { useFilterService } from '@/hooks/useFilterService';
import AnimatedHeaderUser, {IAnimatedHeaderUserRef} from '@/components/widgets/AnimatedHeaderUser/AnimatedHeaderUser';

import type { ServiceDTOAndDepartmentName } from '@/api/routes/service/types/service.types';


interface ISetButton {
    color: string;
    text: string;
    handlePressButton: Function;
}


/**
 * @page `Страница добавления/удаления услуг мастера.`
 */
const AdminAddServiceForMaster: FC = () => {
    let { id, name, department_name, picture, surname } = useLocalSearchParams<{id: string, name: string, picture: string , department_name?: string, surname: string}>();
    if(!id || !name || !picture || !surname) return;

    const someRef = useRef<IAnimatedHeaderUserRef>(null);
    
    const {serviceOfMaster, setServiceOfMaster} = useHookGetServiceOfMaster(Number(id));

    const {        
        bottomSheetRef,
        openList,
        sheetDepartments,
        curentFilter,
        setCurentFilter,
        closeList,
        services,
        filterService,
        notFilter
    } = useFilterService();


    /**
     * `Установить настройки кнопки.`
     */
    const setSettingsButton = (item: ServiceDTOAndDepartmentName): ISetButton => {
        if(serviceOfMaster === null || !serviceOfMaster.some(el => el.id === item.id)) {
            return {
                color: COLOR_ROOT.BUTTON_COLOR_GREEN,
                text: 'добавить',
                handlePressButton: async () => {
                    VibrationApp.select();
                    await httpMasterService.POST_masterAndService('push', Number(id), item.id);
                    setServiceOfMaster(state => ([...state, {...item, id_master: Number(id)}]));
                }
            }
        } else {
            return {
                color: COLOR_ROOT.BUTTON_COLOR_RED,
                text: 'убрать',
                handlePressButton: async () => {
                    VibrationApp.select();
                    await httpMasterService.POST_masterAndService('remove', Number(id), item.id);
                    setServiceOfMaster( state => state.filter(el => el.id !== item.id) );
                }
            }
        }
    } 


    return (
        <>
            <WrapperScroll titlePage='Услуги мастера' isScrollEnabled={false} imgFilter={require('@/source/img/icon/filter_white.png')} handlePessImgFilter={() => openList()} >
                <AnimatedHeaderUser title={`${surname} ${name}`} subtitle={department_name} picture={picture} ref={someRef} />
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
                            scrollEventThrottle={16}
                            onScroll={someRef.current?.handleScroll}
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
    )
};


const styles = StyleSheet.create({
    main: { flex: 1, paddingHorizontal: 15, marginTop: 5 },
    boxButton: { paddingHorizontal: 10, marginBottom: 5 }
});


export default AdminAddServiceForMaster;