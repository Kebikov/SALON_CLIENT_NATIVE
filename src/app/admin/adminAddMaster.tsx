import { View, Text, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, Pressable, Platform, Image } from 'react-native';
import React, { FC, useState, useRef } from 'react';
import WrapperScroll from '@/components/wrappers/WrapperScroll/WrapperScroll';
import * as ImagePicker from 'expo-image-picker';
import BottomModalSheet from '@/components/wrappers/BottomModalSheet/BottomModalSheet';
import { useHookGetDataDepartments } from '@/hooks/GET/useHookGetDataDepartments';
import { COLOR_ROOT } from '@/data/colors';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import { useHookCheckErrorResponce } from '@/hooks/useHookCheckErrorResponce';
import { sendData } from '@/helpers/helpersForComponents/adminAddService/sendData';
import InputServiceTitle from '@/components/shared/shared_AdminAddService/InputServiceTitle';
import InputServiceDescription from '@/components/shared/shared_AdminAddService/InputServiceDescription';
import InputServicePrice from '@/components/shared/shared_AdminAddService/InputServicePrice';
import InputServiceTime from '@/components/shared/shared_AdminAddService/InputServiceTime';
import ButtonSelectImage from '@/components/shared/shared_AdminAddService/ButtonSelectImage';
import ButtonSelectDepartment from '@/components/shared/shared_AdminAddService/ButtonSelectDepartment';
import { useRouter } from 'expo-router';
import BottomModalSheetWithDepartment from '@/components/widgets/BottomModalSheetWithDepartment/BottomModalSheetWithDepartment';
import { editData } from '@/helpers/helpersForComponents/adminEditService/editData';
import InputMasterName from '@/components/shared/shared_AdminAddMaster/InputMasterName';
import InputMasterSurname from '@/components/shared/shared_AdminAddMaster/InputMasterSurname';
import InputMasterDescription from '@/components/shared/shared_AdminAddMaster/InputMasterDescription';
import InputMasterPhone from '@/components/shared/shared_AdminAddMaster/InputMasterPhone';
import InputMasterEmail from '@/components/shared/shared_AdminAddMaster/InputMasterEmail';
import InputMasterPassword from '@/components/shared/shared_AdminAddMaster/InputMasterPassword';

import type { ServiceDTOAndDepartmentName } from '@/api/routes/service/types/service.types';
import type { IRefBottomModalSheet } from '@/components/wrappers/BottomModalSheet/types';
import type { IAddMaster } from '@/api/routes/master/types/master.dto';

const sizeTitle = 16;

/**
 * @page `Страница добавления мастера.`
 */
const AdminAddMaster: FC = () => {

    const {dataDepartments} = useHookGetDataDepartments();

    const {modalMessageError, isMessage} = useHookCheckErrorResponce();

    /**
     * @param selectedImage Выбраное изображение.
     */
    const [selectedImage, setSelectedImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

    const [data, setData] = useState<IAddMaster>({
        name: '', 
        surname: '',
        description: '',
        phone: '',
        email: '',
        password: '',
        id_department: 0
    });

    const bottomSheetRef = useRef<IRefBottomModalSheet>(null);
    const openList = () => bottomSheetRef.current?.openModal();
    const closeList = () => bottomSheetRef.current?.closeModal();

    /**
     * Выбор группы.
     */
    const choiceDepartment = (id: number, name: string) => {
        setData( state => ({...state, id_department: id, name}) );
        closeList();
    }

    /**
     * Изминение данных при заполнении формы.
     */
    const onChangeForm = (e: NativeSyntheticEvent<TextInputChangeEventData>, key: string) => {
        e.persist();
        setData( state => ({...state, [key]: e.nativeEvent.text}) );
    }

    return (
        <>
            <WrapperScroll titlePage='Добавление мастера' >
                <View style={styles.main} >
                    <InputMasterName sizeTitle={sizeTitle} onChangeForm={onChangeForm} data={data} />
                    <InputMasterSurname sizeTitle={sizeTitle} onChangeForm={onChangeForm} data={data} />
                    <InputMasterDescription sizeTitle={sizeTitle} onChangeForm={onChangeForm} data={data} />
                    <InputMasterPhone sizeTitle={sizeTitle} onChangeForm={onChangeForm} data={data} />
                    <InputMasterEmail sizeTitle={sizeTitle} onChangeForm={onChangeForm} data={data} />
                    <InputMasterPassword sizeTitle={sizeTitle} onChangeForm={onChangeForm} data={data} />
                    <ButtonSelectImage 
                        selectedImage={selectedImage} 
                        setSelectedImage={setSelectedImage} 
                        modalMessageError={modalMessageError}
                    />
                    <ButtonSelectDepartment
                        openList={openList} 
                        nameSelectedDepatment={data.name ? data.name : ''}
                    />
                </View>
            </WrapperScroll>

            <BottomModalSheetWithDepartment
                bottomSheetRef={bottomSheetRef}
                sheetDepartments={dataDepartments}
                handlePress={(item) => choiceDepartment(item.id, item.name)}
            />
        </>
    );
};

const styles = StyleSheet.create({
    main: {flex: 1, paddingHorizontal: 10},
});

export default AdminAddMaster;