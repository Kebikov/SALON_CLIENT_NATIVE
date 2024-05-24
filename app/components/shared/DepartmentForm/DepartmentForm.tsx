import { View, Text, StyleSheet, Image, NativeSyntheticEvent, TextInputChangeEventData, Pressable, ScrollView } from 'react-native';
import React, { FC, useState, useEffect, useRef, useCallback } from 'react';
import QuestionHOC from '@/components/wrappers/QuestionHOC/QuestionHOC';
import Title from '@/components/shared/Title/Title';
import InputGeneric from '@/components/shared/InputGeneric/InputGeneric';
import MenuItem from '@/components/shared/MenuItem/MenuItem';
import type { IDataDepartment } from '@/pages/AdminAddGroupDepartment/AdminAddGroupDepartment';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import type { TypeRootPage } from '@/navigation/navigation.types';
import { COLOR_ROOT } from '@/data/colors';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import { baseLink } from '@/api/axios/axios.instance/instance';
import { useAppDispatch } from '@/redux/store/hooks';
import { setAppDepartment } from '@/redux/slice/department.slice';
import DownBottomSheet from '../DownBottomSheet/DownBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import httpImgService from '@/api/routes/img/service/http.img.service';



interface IDepartmentForm {
    handlePressButton: (data: IDataDepartment) => void;
    titleForButton?: string;
    initialData?: IDataDepartment;
}


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

    /**
     * @param arrImg Массив изображений.
     */
    const [arrImg, setArrImg] = useState<string[]>([]);
    /**
     * @param active Выбраное изображение.
     */
    const [active, setActive] = useState<string>('');
    const [data, setData] = useState<IDataDepartment>({ 
        name: initialData.name, 
        discription: initialData.discription,
        icon: initialData.icon
    });
    const onChangeForm = (e: NativeSyntheticEvent<TextInputChangeEventData>, key: string) => {
        e.persist();
        setData( state => ({...state, [key]: e.nativeEvent.text}) );
    }

    const dispatch = useAppDispatch();

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapeToIndex = (index: number) => bottomSheetRef.current?.snapToIndex(index);
    const handleClosePress = () => bottomSheetRef.current?.close();

    const images = arrImg.map((item: string) => {
        let url = '';
        if(active === '') {
            url = `${baseLink}/api/img/get-img/${item}?type=icon-group&${new Date().getTime()}`;
        } else {
            url = `${baseLink}/api/img/get-img/${item}?type=icon-group`;
        }
        return(
            <Pressable 
                style={styles.item} 
                key={item} 
                onPress={() => setActive(item)}
            >
                <View style={[styles.boxImg, item === active ? {borderColor: 'red'} : {borderColor: COLOR_ROOT.MAIN_COLOR}]} >
                    <Image source={{uri: url}} style={styles.img} />
                </View>
            </Pressable>
        )
    });

    useEffect(() => {
        httpImgService.GET_files('icon-group')
        .then(result => {
            if(result && result.length > 0) {
                setArrImg(result);
            }
        })
        .catch(err => console.error(err));
        return () => {
            dispatch(setAppDepartment('clean'));
        }
    },[]);

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
                    pushFunction={() => snapeToIndex(0)}
                    marginTop={10}
                />

                {
                    data.icon ?
                    <View style={styles.box} >
                        <View style={styles.item} >
                            <View style={[styles.boxImg, {borderColor: COLOR_ROOT.MAIN_COLOR}]} >
                                <Image source={{uri: `${baseLink}/api/img/get-img/${data.icon}?type=icon-group`}} style={styles.img} />
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

                <DownBottomSheet
                    bottomSheetRef={bottomSheetRef}
                    contentInScrollView={images}
                >
                    <View style={styles.boxButton}>
                        <ButtonWithIcon
                            title={active ? 'выбрать' : 'закрыть'}
                            pushButton={() => {
                                setData(state => ({...state, icon: active}));
                                handleClosePress();
                            }}
                            img={require('@/source/img/icon/plus-white.png')}
                        />
                    </View>
                </DownBottomSheet>
        </>
    );
};

const styles = StyleSheet.create({
    boxButton: {
        paddingHorizontal: 10,
        marginBottom: 5
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