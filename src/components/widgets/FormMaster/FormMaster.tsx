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
import Switcher from '@/components/shared/Switcher/Switcher';
import Title from '@/components/shared/Title/Title';
import { editMaster } from '@/helpers/helpersForComponents/adminAddMaster/editMaster';

import type { IRefBottomModalSheet } from '@/components/wrappers/BottomModalSheet/types';
import type { TFormMaster } from '@/app/admin/adminMaster';



interface IFormMaster {
    titlePage: string;
    data: TFormMaster;
    setData: React.Dispatch<React.SetStateAction<TFormMaster>>;
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
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    // console.log('selectedImage >>> ', selectedImage);
    /**
     * @param isAccessBan Заблокирован ли мастер.
     */
    const [isAccessBan, setIsAccessBan] = useState<boolean | undefined>(data.access_ban === undefined ? undefined : data.access_ban ? true : false);

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
                    {
                        data.access_ban !== undefined
                        ?
                        <View style={styles.switcher} >
                            <Switcher isEnabledInitial={data.access_ban ? false : true} setState={data.access_ban === undefined ? undefined : setIsAccessBan}/>
                            <Title text={isAccessBan ? 'Мастер заблокирован.' : 'Мастер активен.'} fontSize={16} />
                        </View>
                        :
                        null
                    }
                    
                    <ButtonSelectImage 
                        selectedImage={selectedImage} 
                        setSelectedImage={setSelectedImage} 
                        modalMessageError={modalMessageError}
                        initialImage={data.picture}
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
                                if(data.id) {
                                    editMaster({selectedImage, data, isAccessBan, modalMessageError, isMessage, router});
                                } else {
                                    addMaster({selectedImage, data, modalMessageError, isMessage, router});
                                }
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
    switcher: {
        marginTop: 10,
        marginBottom: -5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }
});

export default FormMaster;