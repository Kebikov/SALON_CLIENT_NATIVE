import { View, Text, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, Pressable, Platform, Image } from 'react-native';
import React, { FC, useState, useRef } from 'react';
import WrapperScroll from '@/components/wrappers/WrapperScroll/WrapperScroll';
import * as ImagePicker from 'expo-image-picker';
import BottomModalSheet from '@/components/wrappers/BottomModalSheet/BottomModalSheet';
import { useHookGetDataDepartments } from '@/hooks/GET/useHookGetDataDepartments';
import { COLOR_ROOT } from '@/data/colors';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import { useHookCheckErrorResponce } from '@/hooks/useHookCheckErrorResponce';
import InputServiceTitle from '@/components/shared/shared_AdminAddService/InputServiceTitle';
import InputServiceDescription from '@/components/shared/shared_AdminAddService/InputServiceDescription';
import InputServicePrice from '@/components/shared/shared_AdminAddService/InputServicePrice';
import InputServiceTime from '@/components/shared/shared_AdminAddService/InputServiceTime';
import ButtonSelectImage from '@/components/shared/shared_AdminAddService/ButtonSelectImage';
import ButtonSelectDepartment from '@/components/shared/shared_AdminAddService/ButtonSelectDepartment';
import { useRouter } from 'expo-router';
import BottomModalSheetWithDepartment from '../BottomModalSheetWithDepartment/BottomModalSheetWithDepartment';
import { editData } from '@/helpers/helpersForComponents/adminEditService/editData';
import { sendData } from '@/helpers/helpersForComponents/adminAddService/sendData';
import type { ServiceDTOAndDepartmentName } from '@/api/routes/service/types/service.types';
import type { IRefBottomModalSheet } from '@/components/wrappers/BottomModalSheet/types';


interface IFormService {
    titlePage: string;
    data: ServiceDTOAndDepartmentName;
    setData: React.Dispatch<React.SetStateAction<ServiceDTOAndDepartmentName>>;
}

const sizeTitle = 16;

/**
 * @widgets `Форма для добавления/редактирования сервиса.`
 */
const FormService: FC<IFormService> = ({
    titlePage, 
    data, 
    setData
}) => {

    const router = useRouter();
    const {modalMessageError, isMessage} = useHookCheckErrorResponce();
    
    /**
     * @param selectedImage Выбраное изображение.
     */
    const [selectedImage, setSelectedImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
    
    const {dataDepartments} = useHookGetDataDepartments();

    const bottomSheetRef = useRef<IRefBottomModalSheet>(null);
    const openList = () => bottomSheetRef.current?.openModal();
    const closeList = () => bottomSheetRef.current?.closeModal();
    /**
     * Изминение данных при заполнении формы.
     */
    const onChangeForm = (e: NativeSyntheticEvent<TextInputChangeEventData>, key: string) => {
        e.persist();
        setData( state => ({...state, [key]: e.nativeEvent.text}) );
    }
    /**
     * Выбор группы.
     */
    const choiceDepartment = (id: number, name: string) => {
        setData( state => ({...state, id_department: id, name}) );
        closeList();
    }

    return (
        <>
            <WrapperScroll titlePage={titlePage} >
                <View style={styles.main} >
                    <InputServiceTitle sizeTitle={sizeTitle} data={data} onChangeForm={onChangeForm} />
                    <InputServiceDescription sizeTitle={sizeTitle} data={data} onChangeForm={onChangeForm} />
                    <InputServicePrice sizeTitle={sizeTitle} data={data} onChangeForm={onChangeForm} />
                    <InputServiceTime sizeTitle={sizeTitle} data={data} onChangeForm={onChangeForm} />
                    <ButtonSelectImage 
                        selectedImage={selectedImage} 
                        setSelectedImage={setSelectedImage} 
                        modalMessageError={modalMessageError} 
                        initialImage={data.img ? data.img : ''} 
                    />
                    <ButtonSelectDepartment 
                        openList={openList} 
                        nameSelectedDepatment={data.department_name ? data.department_name : ''} 
                    />
                    <View style={{flex: 1, justifyContent: 'flex-end', paddingVertical: 10}}>
                        <ButtonWithIcon 
                            title='добавить' 
                            pushButton={() => {
                                    // Если есть начальное ID то значит это редактирование услуги.
                                    if(data.id) {
                                        editData({selectedImage, data, modalMessageError, isMessage, router});
                                    } else {
                                        sendData({selectedImage, data, modalMessageError, isMessage, router});
                                    }
                                }
                            } 
                            img={require('@/source/img/icon/plus-white.png')}
                        />
                    </View>
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
    selectItem: {
        width: '100%', 
        paddingVertical: 10,

        borderBottomWidth: 1, 
        borderColor: 'rgba(0,0,0,.15)'
    },
    button: {
        borderRadius: 10, 
        overflow: 'hidden', 
        marginTop: 10, 
        backgroundColor: COLOR_ROOT.GRAY,
        paddingVertical: 10
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: '500',
    }
});


export default FormService;