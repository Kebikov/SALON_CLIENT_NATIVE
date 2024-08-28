import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React, { FC } from 'react';
import { useHookGetDataMasters } from '../../hooks/GET/useHookGetDataMasters';
import WrapperScroll from '@/components/wrappers/WrapperScroll/WrapperScroll';
import MasterCartHorizontal from '../../components/shared/MasterCartHorizontal/MasterCartHorizontal';
import { useHookRouter } from '../../helpers/router/useHookRouter';


/**
 * @page `Страница со всеми мастерами и переходом на их страницу настроек.`
 */
const AdminAllMasters: FC = () => {
    console.info('PAGE_admin/adminAllMasters');
    const {masters, setMasters} = useHookGetDataMasters();
    const {appRouter} = useHookRouter();

    return (
        <WrapperScroll titlePage='Команда' isScrollEnabled={false} >
            <View style={styles.main} >
                <FlatList
                    contentContainerStyle={{paddingVertical: 10, gap: 10}}
                    data={masters}
                    extraData={masters}
                    renderItem={({item}) => (
                        <Pressable 
                            onPress={() => appRouter.navigate({
                                pathname: '/admin/adminSettingsMaster/[id]', 
                                params: {id: item.id, name: item.name, surname: item.surname, picture: item.picture, departmentName: item.department_name}
                            })}
                        >
                            <MasterCartHorizontal
                                name={item.name}
                                surname={item.surname}
                                picture={item.picture}
                                email={item.email}
                                phone={item.phone}
                                access_ban={item.access_ban}
                                average_stars={item.average_stars}
                                department_name={item.department_name}
                            />
                        </Pressable>
                    )}
                    keyExtractor={item => String(item.id)}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                />
            </View>
        </WrapperScroll>
    );
};

const styles = StyleSheet.create({
    main: { flex: 1, paddingHorizontal: 15},
    boxButton: { paddingHorizontal: 10, marginBottom: 5 },
});

export default AdminAllMasters;