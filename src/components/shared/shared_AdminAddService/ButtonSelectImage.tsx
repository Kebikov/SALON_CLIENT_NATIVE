import { View, Text, StyleSheet, Pressable, Image, Platform } from 'react-native';
import React, { FC } from 'react';
import Discription from '@/components/shared/Discription/Discription';
import { pickImageAsync } from '@/helpers/helpersForComponents/adminAddService/pickImageAsync';
import * as ImagePicker from 'expo-image-picker';
import { baseLink } from '@/api/axios/axios.instance/instance';
import { COLOR_ROOT } from '@/data/colors';


interface IButtonSelectImage {
    selectedImage: ImagePicker.ImagePickerAsset | null;
    setSelectedImage: React.Dispatch<React.SetStateAction<ImagePicker.ImagePickerAsset | null>>;
    modalMessageError: (title: string, discription: string) => void;
    initialImage?: string;
}


/**
 * @shared `Кнопка для выбора изображения.`
 * @param selectedImage Выбраное изображение.
 * @param setSelectedImage Установка выбраного изображения.
 * @param modalMessageError Функция модального окна.
 * @optional
 * @param initialImage ? Начальное изображение. ['14.png']
 */
const ButtonSelectImage: FC<IButtonSelectImage> = ({selectedImage, setSelectedImage, modalMessageError, initialImage = null}) => {

    let uriImg = '';
    
    if (initialImage) {
        uriImg = `${baseLink}/api/img/get-img/${initialImage}?type=img_imgService`;
    } 

    if(selectedImage) {
        uriImg = selectedImage.uri;
    } 

    return (
        <>
        <Pressable
                onPress={() => pickImageAsync(setSelectedImage, modalMessageError)}
                style={[styles.button, {marginTop: 20}]}
            >
                <Text style={[styles.buttonText, {fontSize: Platform.OS === 'ios' ? 15 : 13}]} >Выбор фото</Text>
                {
                selectedImage || initialImage
                ?
                <View style={{width: '100%', marginTop: 5, alignItems: 'center'}} >
                    <View style={{width: 70, height: 70, overflow: 'hidden', borderRadius: 10}} >
                        <Image source={{uri: uriImg}} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
                    </View>
                </View>
                :
                null
            }
            </Pressable>
            <Discription text='Размер до 2 MB., формат : jpg / jpeg / png' position='center' marginTop={5} />
        </>
    );
};

const styles = StyleSheet.create({

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

export default ButtonSelectImage;