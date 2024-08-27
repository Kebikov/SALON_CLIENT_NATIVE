import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React, { FC } from 'react';
import { useHookGetDataMasters } from '../../hooks/GET/useHookGetDataMasters';
import WrapperScroll from '@/components/wrappers/WrapperScroll/WrapperScroll';
import MasterCartHorizontal from '../../components/shared/MasterCartHorizontal/MasterCartHorizontal';

/**
 * @page `Страница со всеми мастерами и переходом на их страницу настроек.`
 */
const AdminAllMasters: FC = () => {

    const {masters, setMasters} = useHookGetDataMasters();

    return (
        <WrapperScroll titlePage='Команда' isScrollEnabled={false} >
            <View style={styles.main} >
                <FlatList
                    contentContainerStyle={{paddingVertical: 10, gap: 10}}
                    data={masters}
                    extraData={masters}
                    renderItem={({item}) => (
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