import { View, Text, StyleSheet } from 'react-native';
import React, { FC, useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import AnimatedHeaderUser, {IAnimatedHeaderUserRef} from '@/components/widgets/AnimatedHeaderUser/AnimatedHeaderUser';
import WrapperScroll from '../../../components/wrappers/WrapperScroll/WrapperScroll';
import { FlatList } from 'react-native-gesture-handler';
import MenuItem from '../../../components/shared/MenuItem/MenuItem';
import { useHookRouter } from '../../../helpers/router/useHookRouter';


export type TRouteAdminSettingsMaster = {
    id: string;
    name: string;
    surname: string; 
    picture: string;
    departmentName?: string;
}

interface IData {
    id: string;
    title: string;
    subTitle: string;
    img: number;
    press: Function;
}


/**
 * @page `Страница мастера со всеми настройками, такими как:`
 * - График работы.
 * - Услуги мастера.
 */
const AdminSettingsMaster: FC = () => { console.info('PAGE_admin/adminSettingsMaster/[id]');

    const {
        id, name, surname, picture, departmentName
    } = useLocalSearchParams<TRouteAdminSettingsMaster>();

    const addService = () => {
        appRouter.navigate({pathname: '/admin/adminAddServiceForMaster/[id]', 
            params: {id, name, surname, picture, departmentName}
        });
    }

    const someRef = useRef<IAnimatedHeaderUserRef>(null);

    const {appRouter} = useHookRouter();

    const DATA: IData[] = [
        {
            id: '1',
            title: 'График работы',
            subTitle: 'табель работы мастера',
            img: require(`@/source/img/icon/calendar.png`),
            press: () => appRouter.navigate({
                pathname: '/admin/adminTimetable/[id]',
                params: {id, name, surname, picture, departmentName}
            })
        },
        {
            id: '2',
            title: 'Услуги',
            subTitle: 'работа с услугами мастера',
            img: require(`@/source/img/icon/bag.png`),
            press: () => appRouter.navigate('/admin/adminService')
        }
    ];

    return (
        <WrapperScroll titlePage='Мастер' isScrollEnabled={false} >
            <AnimatedHeaderUser 
                title={`${surname} ${name}`} // Заголовок.
                subtitle={departmentName} // Под заголовок. 
                picture={picture} // Изображение.
                ref={someRef} // Ref.
            />
            <FlatList
                contentContainerStyle={{ gap: 5, paddingBottom: 10 }}
                data={DATA}
                renderItem={({item}) =>                 
                    <MenuItem
                        title={item.title}
                        subTitle={item.subTitle}
                        img={item.img}
                        pushFunction={() => item.press()}
                        arrowColor='grey'
                    />
                }
                keyExtractor={item => item.id}
                onScroll={someRef.current?.handleScroll}
            />
        </WrapperScroll>
    )
};

const styles = StyleSheet.create({
});

export default AdminSettingsMaster;