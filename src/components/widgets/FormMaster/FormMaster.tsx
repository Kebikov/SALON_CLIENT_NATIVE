import { View, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import React, { FC, useState, useRef } from 'react';
import WrapperScroll from '@/components/wrappers/WrapperScroll/WrapperScroll';
import * as ImagePicker from 'expo-image-picker';
import { useHookGetDataDepartments } from '@/hooks/GET/useHookGetDataDepartments';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import { useHookCheckErrorResponce } from '@/hooks/useHookCheckErrorResponce';
import ButtonSelectImage from '@/components/shared/shared_AdminAddService/ButtonSelectImage';
import ButtonSelectDepartment from '@/components/shared/shared_AdminAddService/ButtonSelectDepartment';
import { useRouter } from 'expo-router';
import BottomModalSheetWithDepartment from '@/components/widgets/BottomModalSheetWithDepartment/BottomModalSheetWithDepartment';
import InputMasterName from '@/components/shared/shared_AdminAddMaster/InputMasterName';
import InputMasterSurname from '@/components/shared/shared_AdminAddMaster/InputMasterSurname';
import InputMasterDescription from '@/components/shared/shared_AdminAddMaster/InputMasterDescription';
import InputMasterPhone from '@/components/shared/shared_AdminAddMaster/InputMasterPhone';
import InputMasterEmail from '@/components/shared/shared_AdminAddMaster/InputMasterEmail';
import InputMasterPassword from '@/components/shared/shared_AdminAddMaster/InputMasterPassword';
import { addMaster } from '@/helpers/helpersForComponents/adminAddMaster/addMaster';

import type { IRefBottomModalSheet } from '@/components/wrappers/BottomModalSheet/types';
import type { IAddMaster } from '@/api/routes/master/types/master.dto';
import type { IMasterFind } from '@/api/routes/master/types/master.dto';


interface IFormMaster {
    titlePage: string;
    data: IAddMaster & {department_name: string};
    setData: React.Dispatch<React.SetStateAction<IAddMaster & {department_name: string}>>;
}

const sizeTitle = 16;


/**
 * @component
 * @example 
 * @returns {JSX.Element}
 */
const FormMaster: FC<IFormMaster> = ({
    titlePage,
    data,
    setData
}) => {

    const router = useRouter();
    const {dataDepartments} = useHookGetDataDepartments();

    const {modalMessageError, isMessage} = useHookCheckErrorResponce();

    /**
     * @param selectedImage Выбраное изображение.
     */
    const [selectedImage, setSelectedImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

    const bottomSheetRef = useRef<IRefBottomModalSheet>(null);
    const openList = () => bottomSheetRef.current?.openModal();
    const closeList = () => bottomSheetRef.current?.closeModal();

    /**
     * Выбор группы.
     */
    const choiceDepartment = (id: number, department_name: string) => {
        setData( state => ({...state, id_department: id, department_name}) );
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
            <WrapperScroll titlePage={titlePage} >
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
                        nameSelectedDepatment={data.department_name ? data.department_name : ''}
                    />
                </View>
                <View style={{flex: 1, justifyContent: 'flex-end', paddingVertical: 10, paddingHorizontal: 10}}>
                    <ButtonWithIcon 
                        height={50}
                        title='добавить' 
                        pushButton={() => {
                                addMaster({selectedImage, data, modalMessageError, isMessage, router});
                                // Если есть начальное ID то значит это редактирование услуги.
                                // if(data.id) {
                                //     editData({selectedImage, data, modalMessageError, isMessage, router});
                                // } else {
                                //     sendData({selectedImage, data, modalMessageError, isMessage, router});
                                // }
                            }
                        } 
                        img={require('@/source/img/icon/plus-white.png')}
                    />
                </View>
            </WrapperScroll>

            <BottomModalSheetWithDepartment
                typeModal='select'
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

export default FormMaster;