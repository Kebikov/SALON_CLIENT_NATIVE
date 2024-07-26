import { View, Text, StyleSheet } from 'react-native';
import React, { FC, useState, useEffect } from 'react';
import { useHookGetDataMasters } from '@/hooks/GET/useHookGetDataMasters';
import WrapperScroll from '@/components/wrappers/WrapperScroll/WrapperScroll';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import MasterCartForAdmin from '@/components/shared/MasterCartForAdmin/MasterCartForAdmin';
import { FlatList } from 'react-native-gesture-handler';
import { useHookRouter } from '@/helpers/router/useHookRouter';




/**
 * @page 'Страница с мастерами и кнопкой добавления мастера.'
 */
const AdminMaster: FC = () => {
    
    const {appRouter} = useHookRouter();
    const {masters} = useHookGetDataMasters();

    if(masters.length === 0) return;

    return (
        <WrapperScroll titlePage='Команда' isScrollEnabled={false} >
            <View style={styles.main} >
                <FlatList
                    contentContainerStyle={{paddingVertical: 10, gap: 10}}
                    data={masters}
                    extraData={masters}
                    renderItem={({item}) => (
                        <MasterCartForAdmin
                            name={item.name}
                            surname={item.surname}
                            department={item.department_name}
                            grade={item.average_stars}
                            picture={item.picture}
                            access_ban={item.access_ban}
                            phone={item.phone}
                            email={item.email}
                        />
                    )}
                    keyExtractor={item => String(item.id)}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                />
            </View>
            <View style={styles.boxButton}>
                <ButtonWithIcon 
                    title='добавить мастера' 
                    pushButton={() => appRouter.navigate('/admin/adminAddMaster')} 
                    img={require('@/source/img/icon/plus-white.png')} 
                    marginTop={10} 
                    height={50}
                />
            </View>
        </WrapperScroll>
    );
};

const styles = StyleSheet.create({
    main: { flex: 1, paddingHorizontal: 15},
    boxButton: { paddingHorizontal: 10, marginBottom: 5 },
});

export default AdminMaster;