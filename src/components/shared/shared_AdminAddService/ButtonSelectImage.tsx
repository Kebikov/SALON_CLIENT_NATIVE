import { View, Text, StyleSheet, Pressable, Image, Platform } from 'react-native';
import React, { FC } from 'react';
import Discription from '@/components/shared/Discription/Discription';
import { pickImageAsync } from '@/helpers/helpersForComponents/adminAddService/pickImageAsync';
import * as ImagePicker from 'expo-image-picker';
import { COLOR_ROOT } from '@/data/colors';


interface IButtonSelectImage {
    selectedImage: ImagePicker.ImagePickerAsset | null;
    setSelectedImage: React.Dispatch<React.SetStateAction<ImagePicker.ImagePickerAsset | null>>;
    modalMessageError: (title: string, discription: string) => void;
}


/**
 * @shared `Кнопка для выбора изображения.`
 */
const ButtonSelectImage: FC<IButtonSelectImage> = ({selectedImage, setSelectedImage, modalMessageError}) => {

    return (
        <>
        <Pressable
                onPress={() => pickImageAsync(setSelectedImage, modalMessageError)}
                style={[styles.button, {marginTop: 20}]}
            >
                <Text style={[styles.buttonText, {fontSize: Platform.OS === 'ios' ? 15 : 13}]} >Выбор фото</Text>
                {
                selectedImage
                ?
                <View style={{width: '100%', marginTop: 5, alignItems: 'center'}} >
                    <View style={{width: 70, height: 70, overflow: 'hidden', borderRadius: 10}} >
                        <Image source={{uri: selectedImage.uri}} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
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