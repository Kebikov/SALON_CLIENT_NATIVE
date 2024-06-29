import { View, StyleSheet, FlatList, Text } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import WrapperMenu from '@/components/wrappers/WrappersMenu/WrappersMenu';
import ServiceCart from '@/components/shared/ServiceCart/ServiceCart';
import ButtonWithIcon from '../../components/shared/ButtonWithIcon/ButtonWithIcon';
import { useHookRouter } from '@/helpers/router/useHookRouter';
import httpServiceService from '@/api/routes/service/service/http.service.service';
import type { ServiceDTOAndDepartmentName } from '@/api/routes/service/types/service.types';


/**
 * @page `Страница с услугами и кнопкой добавления услуги.`
 * @example 
 * @returns {JSX.Element}
 */
const AdminService: FC = () => {

    const [services, setServices] = useState<ServiceDTOAndDepartmentName[] | []>([]);

    const {appRouter} = useHookRouter();

    useEffect(() => {
        httpServiceService
            .GET_getAllServices()
            .then(res => {
                if(res) setServices(res);
            })
            .catch(error => console.error(`Error in AdminService GET_getAllServices >>> `, error));
    }, []);

    return (
        <WrapperMenu titlePage='Услуги'>
            <View style={styles.main} >
                {
                    services.length > 0
                    ?
                    <FlatList
                        contentContainerStyle={{ gap: 0, paddingBottom: 10 }}
                        data={services}
                        renderItem={ ({item}) => <ServiceCart title={item.title} department={item.name ? item.name : 'нет группы'} time={item.time} price={item.price} img={item.img} /> }
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
                        appRouter.navigate('admin/adminAddService');
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