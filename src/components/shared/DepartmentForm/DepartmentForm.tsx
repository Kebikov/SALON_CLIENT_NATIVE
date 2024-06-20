import { View, StyleSheet, Image, NativeSyntheticEvent, TextInputChangeEventData, Platform } from 'react-native';
import { FC, useState, useRef } from 'react';
import QuestionHOC from '@/components/wrappers/QuestionHOC/QuestionHOC';
import Title from '@/components/shared/Title/Title';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';
import MenuItem from '@/components/shared/MenuItem/MenuItem';
import { COLOR_ROOT } from '@/data/colors';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import { baseLink } from '@/api/axios/axios.instance/instance';
import ImagesIcon from '@/components/shared/ImagesIcon/ImagesIcon';
import { useHookGetIcon } from '@/hooks/useHookGetIcon';
import type { IDataDepartment } from '@/app/(admin)/adminAddDepartment';
import type { IDepartmentForm } from './DepartmentForm.dto';
import BottomModalSheet from '@/components/wrappers/BottomModalSheet/BottomModalSheet';
import type { IRefBottomModalSheet } from '@/components/wrappers/BottomModalSheet/types';


/**
 * @shared `Форма добавления группы.`
 * @param handlePressButton Функция обрабатываюшяя нажатие на кнопку.
 * @param titleForButton ? Текст кнопки.
 * @param initialData ? Начальные данные.
 */
const DepartmentForm: FC<IDepartmentForm> = ({
        titleForButton = 'добавить', 
        handlePressButton, 
        initialData = {name: '', discription: '', icon: ''}
    }) => {

    const {arrImg, active, setActive} = useHookGetIcon();

    const [data, setData] = useState<IDataDepartment>({ 
        name: initialData.name, 
        discription: initialData.discription,
        icon: initialData.icon
    });

    const onChangeForm = (e: NativeSyntheticEvent<TextInputChangeEventData>, key: string) => {
        e.persist();
        setData( state => ({...state, [key]: e.nativeEvent.text}) );
    }

    const bottomSheetRef = useRef<IRefBottomModalSheet>(null);

    const openList = () => bottomSheetRef.current?.openModal();
    const closeList = () => bottomSheetRef.current?.closeModal();

    return (
        <>
            <QuestionHOC
                title='Группа'
                discription='Напишите краткое название группы, данное название будет показано клиенту для выбора отдела услуг, например: причёска, маникюр, массаж и т.д.'
                marginTop={10}
            >
                <Title text='Группа' location='left'/>
            </QuestionHOC>
            <InputGeneric
                keyName='name'
                placeholder='Имя группы'
                img={require('@/source/img/icon/group-gray.png')}
                onChangeForm={onChangeForm}
                value={data.name}
            />
            <QuestionHOC
                title='Описание'
                discription='Напишите краткое описание добавляемой группы.'
                marginTop={10}
            >
                <Title text='Описание' location='left'/>
            </QuestionHOC>
            <InputGeneric
                keyName='discription'
                placeholder='Описание для группы.'
                img={require('@/source/img/icon/write.png')}
                onChangeForm={onChangeForm}
                lines={2}
                value={data.discription}
            />
            <MenuItem
                title='Выбор иконки'
                subTitle='иконка для отображения группы'
                img={require('@/source/img/icon/choice.png')}
                //pushFunction={() => snapeToIndex(0)}
                pushFunction={() => openList()}
                marginTop={10}
            />

            {
                data.icon ?
                <View style={styles.box} >
                    <View style={styles.item} >
                        <View style={[styles.boxImg, {borderColor: COLOR_ROOT.MAIN_COLOR}]} >
                            <Image source={{uri: `${baseLink}/api/img/get-img/${data.icon}?type=icon_icon-group`}} style={styles.img} />
                        </View>
                    </View>
                </View>
                :
                null
            }

            <ButtonWithIcon
                title={titleForButton}
                img={require('@/source/img/icon/group-gray.png')}
                pushButton={() => handlePressButton(data)}
                marginTop={10}
            />

            <BottomModalSheet 
                ref={bottomSheetRef} 
                buttonForModal={
                    <View style={styles.boxButton}>
                        <ButtonWithIcon
                            title={active ? 'выбрать' : 'закрыть'}
                            pushButton={() => {
                                setData(state => ({...state, icon: active}));
                                closeList();
                            }}
                            img={require('@/source/img/icon/plus-white.png')}
                        />
                </View>
                }
            >
                <View style={styles.contentContainer}>
                    {
                        arrImg.length > 0
                        ?
                        <ImagesIcon active={active} setActive={setActive} arrImg={arrImg} />
                        : 
                        null
                    }
                </View>
            </BottomModalSheet>

        </>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    boxButton: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingBottom: Platform.OS === 'ios' ? 20 : 10,
        backgroundColor: 'white'
    },
    item: {
        width: '25%',
        height: '100%',
        aspectRatio: 1 / 1,
        padding: 7
    },
    box: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    boxImg: {
        flex: 1,
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2
    },
    img: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%'
    },
});

export default DepartmentForm;