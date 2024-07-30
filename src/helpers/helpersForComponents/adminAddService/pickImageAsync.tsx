import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';


/**
 * `Выбор изображения.`
 */
export const pickImageAsync = async (
    setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>,
    modalMessageError: (title: string, discription: string) => void
) => {
    await clearCache();
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        //Alert.alert('')
        return;
    }

    const getPermissionResult = await ImagePicker.getMediaLibraryPermissionsAsync();
    if(!getPermissionResult) {
        return;
    }


    let result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
        
        setSelectedImage(result.assets[0].uri);

    
    } else {
        Alert.alert('Фото не выбрано.', 'Вы не выбрали ни одного фото');
    }
};

async function clearCache() {
    try{
        const cacheDir = FileSystem.cacheDirectory;
        if(!cacheDir) return;
        const fileInfo = await FileSystem.getInfoAsync(cacheDir + 'ExperienceData');
        console.log(fileInfo);

        if(fileInfo.exists) {
            await FileSystem.deleteAsync(cacheDir + 'ExperienceData');
            //const files = await FileSystem.readDirectoryAsync('file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540kebikov%252Fsalon_client_native/ImagePicker/');
            console.log(cacheDir);
            //console.log('files >>> ', files);
        }

    } catch(error) {
        console.log('Error clearing cache >>> ', error);
    }

}