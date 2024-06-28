import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';


/**
 * `Выбор изображения.`
 */
export const pickImageAsync = async (
    setSelectedImage: React.Dispatch<React.SetStateAction<ImagePicker.ImagePickerAsset | null>>,
    modalMessageError: (title: string, discription: string) => void
) => {
    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1]
    });

    if (!result.canceled) {
        const typeImg = result.assets[0].mimeType;
        const sizeImg = result.assets[0].fileSize;
        if(sizeImg && sizeImg > 2 * 1024 * 1024) {
            return modalMessageError('Большой размер', 'Выберите фотографию до 2 Мб. или конвертируйте данное фото.');
        }
        if(typeImg && !(typeImg.includes("image/jpeg") || typeImg.includes("image/png") || typeImg.includes("image/jpg")) ) {
            return modalMessageError('Ошибка формата', 'Выберите изображение подходяшего формата, а именно:  jpg / jpeg / png');
        }
        console.log(result.assets[0].fileName);
        
        setSelectedImage(result.assets[0]);
    } else {
        Alert.alert('Фото не выбрано.', 'Вы не выбрали ни одного фото');
    }
};