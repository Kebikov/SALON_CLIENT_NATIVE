import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React, { FC } from 'react';
import { useHookGetDataMasters } from '../../hooks/GET/useHookGetDataMasters';
import WrapperScroll from '@/components/wrappers/WrapperScroll/WrapperScroll';
import MasterCartHorizontal from '../../components/shared/MasterCartHorizontal/MasterCartHorizontal';
import { useHookRouter } from '../../helpers/router/useHookRouter';
import MasterJust from '@/components/shared/MasterJust/MasterJust';


/**
 * @page `Страница со всеми мастерами и переходом их график работы.`
 */
const AdminTimetable: FC = () => {
    console.info('PAGE_admin/AdminTimetable');

    const {masters, setMasters} = useHookGetDataMasters();
    const {appRouter} = useHookRouter();
    
    const filterMasters = masters.filter(item => item.access_ban === 0);


    return (
        <WrapperScroll titlePage='График работы' isScrollEnabled={false} >
            <View style={styles.main} >
                <FlatList
                    contentContainerStyle={{paddingBottom: 20, gap: 10}}

                    data={filterMasters}
                    renderItem={({item}) => (
                        <MasterJust 
                            master={item} 
                            handlePress={() => appRouter.navigate({pathname: '/admin/masterTimetable/[id]', params: item})} 
                        />
                    )}
                    keyExtractor={item => String(item.id)}
                    extraData={masters}

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

export default AdminTimetable;