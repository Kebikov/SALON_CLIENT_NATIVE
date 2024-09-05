import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { IMasterFind } from '@/api/routes/master/types/master.dto';
import type { TTypeToString } from '@/helpers/router/app.router.types';
import AnimatedHeaderUser from '@/components/widgets/AnimatedHeaderUser/AnimatedHeaderUser';
import WrapperScroll from '@/components/wrappers/WrapperScroll/WrapperScroll';


interface Master {
    id: number;
    name: string;
    surname: string;
    description: string;
    phone: string;
    picture: string;
    access_ban: number;
    id_registration: number;
    id_department: number | null;
}



/**
 * @page `Страница с графиком мастера.`
 */
const MasterTimetable: FC = () => {

    const {id, name, surname, department_name, picture} = useLocalSearchParams<TTypeToString<IMasterFind>>();

    if(!id || !name || !surname) throw new Error('Переданны не все данные для страницы MasterTimetable.');

    console.log('MasterTimetable = ', id);

    return (
        <WrapperScroll titlePage='График мастера' >
            <AnimatedHeaderUser
                title={`${surname} ${name}`}
                picture={picture ? picture : ''}
                subtitle={department_name ? department_name : ''}
            />
        </WrapperScroll>
    );
};

const styles = StyleSheet.create({
});

export default MasterTimetable;