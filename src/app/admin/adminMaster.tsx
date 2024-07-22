import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { FC, useState, useEffect } from 'react';
import httpMasterService from '@/api/routes/master/service/http.master.service';
import WrapperMenu from '@/components/wrappers/WrappersMenu/WrappersMenu';
import MasterCart from '@/components/shared/MasterCart/MasterCart';
import MasterCartForAdmin from '@/components/shared/MasterCartForAdmin/MasterCartForAdmin';


import type { IMasterFind } from '@/api/routes/master/types/master.dto';
import { COLOR_ROOT } from '@/data/colors';

/**
 * @page 'Страница с мастерами и кнопкой добавления мастера.'
 */
const AdminMaster: FC = () => {

    const [masters, setMasters] = useState<IMasterFind[]>([]);

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
            <View style={{paddingHorizontal: 15, backgroundColor: COLOR_ROOT.BACKGROUND}} >
                <FlatList
                    contentContainerStyle={{flexGrow: 1, paddingVertical: 10, gap: 10}}
                    numColumns={2}
                    data={masters}
                    extraData={masters}
                    renderItem={({item}) => (
                        <MasterCartForAdmin
                            name={item.name}
                            surname={item.surname}
                            department={item.department_name}
                            grade={5}
                            picture={item.picture}
                            access_ban={item.access_ban}
                            phone={item.phone}
                            email={item.email}
                        />
                    )}
                    keyExtractor={item => String(item.id)}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                />
            </View>
        </WrapperMenu>

    );
};

const styles = StyleSheet.create({
});

export default AdminMaster;