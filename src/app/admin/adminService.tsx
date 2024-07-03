import { View, StyleSheet, FlatList, Text, Alert } from 'react-native';
import React, { FC, useEffect, useState, useCallback } from 'react';
import WrapperMenu from '@/components/wrappers/WrappersMenu/WrappersMenu';
import ServiceCart from '@/components/shared/ServiceCart/ServiceCart';
import ButtonWithIcon from '../../components/shared/ButtonWithIcon/ButtonWithIcon';
import { useHookRouter } from '@/helpers/router/useHookRouter';
import httpServiceService from '@/api/routes/service/service/http.service.service';
import ButtonSwipeable from '@/components/widgets/ButtonSwipeable/ButtonSwipeable';
import { useHookCheckErrorResponce } from '@/hooks/useHookCheckErrorResponce';
import { COLOR_ROOT } from '@/data/colors';
import { useFocusEffect } from 'expo-router';
import type { ServiceDTOAndDepartmentName } from '@/api/routes/service/types/service.types';


/**
 * @page `Страница с услугами и кнопкой добавления услуги.`
 * @example 
 * @returns {JSX.Element}
 */
const AdminService: FC = () => {

    const [services, setServices] = useState<ServiceDTOAndDepartmentName[] | []>([]);

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

    useFocusEffect(
        useCallback(() => {
            httpServiceService
            .GET_getAllServices()
            .then(res => {
                if(res) setServices(res);
            })
            .catch(error => console.error(`Error in AdminService GET_getAllServices >>> `, error));
        }, [])
    );


    return (
        <WrapperMenu titlePage='Услуги'>
            <View style={styles.main} >
                {
                    services.length > 0
                    ?
                    <FlatList
                        contentContainerStyle={{ gap: 10, paddingBottom: 10 }}
                        data={services}
                        renderItem={ ({item}) => (
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
                        extraData={services}
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
    );
};

const styles = StyleSheet.create({
    main: { flex: 1, paddingHorizontal: 5 },
    boxButton: { paddingHorizontal: 10, marginBottom: 5 },
});

export default AdminService;