import { View, Text, StyleSheet } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import type { TPageAdminEditDepartment } from '@/navigation/extra.types'; 
import WrapperMenu from '@/components/wrappers/WrappersMenu/WrappersMenu';
import DepartmentForm from '@/components/shared/DepartmentForm/DepartmentForm';
import httpDepartmentService from '@/api/routes/department/service/http.department.service';
import type { IDataDepartmentAndId } from '@/api/routes/department/types/department.dto';


/**
 * @page Страница редактирования группы.
 * @example 
 */
const AdminEditDepartment: FC<TPageAdminEditDepartment> = ({route}) => {
    
    const idDepartment = route.params.idDepartment;
    const [dataDepartment, setDataDepartment] = useState<IDataDepartmentAndId | null>(null);

    useEffect(() => {
        httpDepartmentService
            .GET_getDepartmentById(idDepartment)
            .then(res => {
                if(!res) return;
                setDataDepartment(res);
            })
            .catch(error => console.log(error));
    }, []);

    //if(!dataDepartment) return;

    return (
        <WrapperMenu page='AdminEditDepartment' titlePage='Редактирование группы'>
            <View style={styles.main} >
                <Text>{idDepartment}</Text>
                {
                    dataDepartment 
                    ?
                    <DepartmentForm
                        handlePressButton={() => {}}
                    />
                    :
                    null
                }

            </View>
        </WrapperMenu>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: 10
    }
});

export default AdminEditDepartment;