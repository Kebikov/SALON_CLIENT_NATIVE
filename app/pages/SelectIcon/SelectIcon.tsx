import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import WrapperMenu from '@/components/wrappers/WrappersMenu/WrappersMenu';
import type { TPageChoiсeImg } from '@/navigation/navigation.types';
import httpImgService from '@/api/routes/img/service/http.img.service';
import { baseLink } from '@/api/axios/axios.instance/instance';
import { COLOR_ROOT } from '@/data/colors';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';


/**
 * @component
 * @example 
 * @returns {JSX.Element}
 */
const SelectIcon: FC<TPageChoiсeImg> = ({route}) => {

    const [arrImg, setArrImg] = useState<string[]>([]);
    const [active, setActive] = useState<string>('');
    console.log('Выбрана :', active);
    const choice = route.params.choice;

    const images = arrImg.map((item, i) => {
        let url = '';
        if(active === '') {
            url = `${baseLink}/api/img/get-img/${item}?type=${choice}&${new Date().getTime()}`;
        } else {
            url = `${baseLink}/api/img/get-img/${item}?type=${choice}`;
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
        if(!choice) return;
        console.log('Effect');
        httpImgService.GET_files(choice)
            .then(result => {
                if(result && result.length > 0) {
                    setArrImg(result);
                }
            })
            .catch(err => console.log(err));
    },[]);


    console.log('Render');
    return (
        <WrapperMenu page='SelectIcon' titlePage='Выбор иконки' >
            <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={'handled'} >
                <View style={styles.main} >
                    <View style={styles.box} >  
                        {images}
                        {images}
                        {images}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.boxButton}>
                <ButtonWithIcon
                    title='выбрать'
                    pushButton={() => {}}
                    img={require('@/source/img/icon/plus-white.png')}
                />
            </View>
        </WrapperMenu>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    box: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        width: '25%',
        height: '100%',
        aspectRatio: 1 / 1,
        padding: 7
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
    text: {
        color: COLOR_ROOT.MAIN_COLOR,
        fontSize: 20
    },
    img: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%'
    },
    boxButton: {
        paddingHorizontal: 10,
        marginBottom: 5
    }
});

export default SelectIcon;