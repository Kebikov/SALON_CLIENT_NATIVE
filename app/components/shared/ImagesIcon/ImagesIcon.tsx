import { View, StyleSheet, Pressable } from 'react-native';
import React, { FC, useMemo } from 'react';
import { baseLink } from '@/api/axios/axios.instance/instance';
import { COLOR_ROOT } from '@/data/colors';
import { Image as ExpoImage } from 'expo-image';


interface IImagesIcon {
    active: string; 
    setActive: React.Dispatch<React.SetStateAction<string>>;
    arrImg: string[];
}


/**
 * @shared Иконки групп.
 * @param active Имя активной иконки. Example: '12.png'
 * @example 
 * @returns {JSX.Element}
 */
const ImagesIcon: FC<IImagesIcon> = ({active, arrImg, setActive}) => {

    const images = useMemo(() => arrImg.map((item: string) => {

        return(
            <Pressable
                style={styles.item}
                key={item} 
                onPress={() => setActive(item)}
            >
                <View style={[styles.boxImg, item === active ? {borderColor: 'red'} : {borderColor: COLOR_ROOT.MAIN_COLOR}]} >
                    <ExpoImage 
                        source={{uri: `${baseLink}/api/img/get-img/${item}?type=icon-group`}} 
                        style={styles.img} 
                        placeholder={'img'}
                        transition={1000}
                    />
                </View>
            </Pressable>
        )
    }), [arrImg, active]);

    return images;
};

const styles = StyleSheet.create({
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
    img: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%'
    },
});

export default ImagesIcon;