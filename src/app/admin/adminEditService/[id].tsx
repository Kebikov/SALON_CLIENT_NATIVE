import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { useLocalSearchParams } from 'expo-router';
import type { ServiceDTOAndDepartmentName } from '@/api/routes/service/types/service.types';
import type { TNumbersToString } from '@/helpers/router/app.router.types';


/**
 * @page Страница редактирования услуги.
 */
const AdminEditService: FC = () => {

    const  { id } = useLocalSearchParams<TNumbersToString<ServiceDTOAndDepartmentName>>();

    console.log(id);

    return (
        <View>
            <Text>[idEditService]</Text>
        </View>
    );
};

const styles = StyleSheet.create({
});

export default AdminEditService;