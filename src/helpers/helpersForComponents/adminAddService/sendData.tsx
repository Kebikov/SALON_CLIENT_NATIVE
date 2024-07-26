import * as ImagePicker from 'expo-image-picker';
import httpServiceService from '@/api/routes/service/service/http.service.service';
import type { ExpoRouter } from 'expo-router/types/expo-router';
import type { ServiceDTO } from '@/api/routes/service/types/service.types';


interface IsendData {
    selectedImage: ImagePicker.ImagePickerAsset | null;
    data: Omit<ServiceDTO, 'img' | 'id'> | null;
    modalMessageError: (title: string, discription: string) => void;
    isMessage: (data: unknown) => void;
    router: ExpoRouter.Router
}

    
/**
 * `Отправка данных на сервер.`
 */
export const sendData = async ({
    selectedImage, 
    data, 
    modalMessageError, 
    isMessage, 
    router
}: IsendData) => {

    try{
        if(!data?.title) return modalMessageError('Нет названия.', 'Введите название услуги.');
        if(!data?.description) return modalMessageError('Нет описания.', 'Введите описание услуги.');
        if(!data?.price) return modalMessageError('Нет цены.', 'Введите цену услуги.');
        if(!data?.time) return modalMessageError('Нет длительности.', 'Введите длительность услуги.');
        if(!selectedImage) return modalMessageError('Нет изображения.', 'Выберите фотографию для услуги.');

        const sliceWithFileName = selectedImage.uri.split('/').at(-1);

        const formData = new FormData();
        formData.append('foo', {
            uri: selectedImage.uri,
            type: selectedImage.mimeType,
            name: selectedImage.fileName || sliceWithFileName || 'image.jpg'
        } as any);
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('price', String(data.price) );
        formData.append('time', String(data.time) );
        if(data.id_department) formData.append('id_department', String(data.id_department) );

        const result = await httpServiceService.POST_createService(formData);
        if(result) isMessage(result);
        router.back();
    } catch(err) {
        console.error(err);
    }
}