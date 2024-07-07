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

            {/*//* Модальное нижнее окно */}
            <BottomModalSheet 
                ref={bottomSheetRef} 
                heightProcent={50} 
                isWithScrooll={false}
            >
                <View style={styles.sheet_header}>
                    <Text style={styles.sheet_title}>Фильтр услуг</Text>
                </View>
                <View style={styles.main_sheet} >
                    {
                        sheetDepartments.length > 2
                        ?
                        <FlatList
                            contentContainerStyle={{ gap: 0, paddingBottom: 10 }}
                            data={sheetDepartments}
                            renderItem={ 
                                ({item, index}) => (
                                    <Pressable
                                        style={index === 0 ? [styles.sheet_button_first, styles.sheet_button] : styles.sheet_button}
                                        onPress={() => {
                                            setCurentFilter(item.name);
                                            closeList();
                                        }}
                                    >
                                        <View style={styles.sheet_box_img} >
                                            <Image style={styles.sheet_img} source={
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
                                        </View>
                                        <Text style={styles.shet_text}>{item.name}</Text>
                                    </Pressable>
                                ) 
                            }
                            keyExtractor={item => item.name ?? 'key'}
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                        />
                        :
                        null
                    }
                </View>
            </BottomModalSheet>
        </>
    );
};

const COLOR_LINE = 'rgba(0, 0, 0, .3)';

const styles = StyleSheet.create({
    main: { flex: 1, paddingHorizontal: 5, marginTop: 5 },
    boxButton: { paddingHorizontal: 10, marginBottom: 5 },
    // sheet
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
    },
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

export default AdminService;