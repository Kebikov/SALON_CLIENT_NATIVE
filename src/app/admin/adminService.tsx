import { View, StyleSheet, Text, Alert, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React, { FC } from 'react';
import WrapperScroll from '@/components/wrappers/WrapperScroll/WrapperScroll';
import ServiceCart from '@/components/shared/ServiceCart/ServiceCart';
import ButtonWithIcon from '../../components/shared/ButtonWithIcon/ButtonWithIcon';
import { useHookRouter } from '@/helpers/router/useHookRouter';
import httpServiceService from '@/api/routes/service/service/http.service.service';
import ButtonSwipeable from '@/components/widgets/ButtonSwipeable/ButtonSwipeable';
import { useHookCheckErrorResponce } from '@/hooks/useHookCheckErrorResponce';
import { COLOR_ROOT } from '@/data/colors';
import BottomModalSheetWithDepartment from '@/components/widgets/BottomModalSheetWithDepartment/BottomModalSheetWithDepartment';
import { useFilterService } from '@/hooks/useFilterService';
import Title from '@/components/shared/Title/Title';

import type { ServiceDTOAndDepartmentName } from '@/api/routes/service/types/service.types';


/**
 * @page `Страница с услугами и кнопкой добавления услуги.`
 */
const AdminService: FC = () => {

    const {
        bottomSheetRef,
        openList,
        sheetDepartments,
        curentFilter,
        setCurentFilter,
        closeList,
        services,
        setServices,
        filterService,
        notFilter
    } = useFilterService();

    const {isMessage} = useHookCheckErrorResponce();
    const {appRouter} = useHookRouter();
    
    const deleteService = (id: number, title: string) => {
        Alert.alert(
            'Удалить группу ?', `После нажатия удалить, группа "${title}" будет удалена.`,
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
        appRouter.navigate({pathname: '/admin/adminEditService/[id]', params: {...item}});
    }


    return (
        <>
            <WrapperScroll titlePage='Услуги' isScrollEnabled={false} imgFilter={require('@/source/img/icon/filter_white.png')} handlePessImgFilter={() => openList()} >
                <View style={styles.main} >

                    {
                        curentFilter === notFilter
                        ?
                        null
                        :
                        <Title text={`Фильтр: ${curentFilter}`} location='left' fontSize={16} marginBottom={5} />
                    }

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
                                            service={item}
                                            borderRadius={0}
                                            isShowButton={false}
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
                        height={50}
                        pushButton={() => {
                            appRouter.navigate('/admin/adminAddService');
                        }} 
                        img={require('@/source/img/icon/plus-white.png')} 
                        marginTop={10} 
                    />
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


export default AdminService;