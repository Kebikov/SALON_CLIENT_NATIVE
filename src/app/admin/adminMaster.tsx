import { View, Text, StyleSheet } from 'react-native';
import React, { FC, useState, useEffect } from 'react';
import httpMasterService from '@/api/routes/master/service/http.master.service';
import WrapperMenu from '@/components/wrappers/WrappersMenu/WrappersMenu';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import MasterCartForAdmin from '@/components/shared/MasterCartForAdmin/MasterCartForAdmin';
import { FlatList } from 'react-native-gesture-handler';
import { useHookRouter } from '@/helpers/router/useHookRouter';

import type { IMasterFind } from '@/api/routes/master/types/master.dto';
import { COLOR_ROOT } from '@/data/colors';

/**
 * @page 'Страница с мастерами и кнопкой добавления мастера.'
 */
const AdminMaster: FC = () => {

    const [masters, setMasters] = useState<IMasterFind[]>([]);
    const {appRouter} = useHookRouter();
    
    useEffect(() => {
        httpMasterService.GET_getMasterAll()
            .then(res => {
                if(!res) return;
                setMasters(res);
            })
            .catch((error) => console.error('Error in [AdminMaster.httpMasterService.GET_getMasterAll()]', error));
    }, []);

    if(masters.length === 0) return;

    return (
        <WrapperMenu titlePage='Команда'>

                <FlatList
                    contentContainerStyle={{paddingVertical: 10, marginHorizontal: 15, gap: 10}}
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
                
                <View style={styles.boxButton}>
                    <ButtonWithIcon 
                        title='добавить мастера' 
                        pushButton={() => appRouter.navigate('/admin/adminAddMaster')} 
                        img={require('@/source/img/icon/plus-white.png')} 
                        marginTop={10} 
                        height={50}
                    />
                </View>
        </WrapperMenu>

    );
};

const styles = StyleSheet.create({
    boxButton: { paddingHorizontal: 10, marginBottom: 5 },
});

export default AdminMaster;