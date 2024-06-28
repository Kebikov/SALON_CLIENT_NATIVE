import * as ImagePicker from 'expo-image-picker';
import httpServiceService from '@/api/routes/service/service/http.service.service';

import type { IService } from '@/api/routes/service/types/service.types';


    
/**
 * `Отправка данных на сервер.`
 */
export const sendData = async (
    selectedImage: ImagePicker.ImagePickerAsset | null, 
    data: Omit<IService, 'img'> | null, 
    modalMessageError: (title: string, discription: string) => void
) => {

    try{
        if(!data?.title) return modalMessageError('Нет названия.', 'Введите название услуги.');
        if(!data?.description) return modalMessageError('Нет описания.', 'Введите описание услуги.');
        if(!data?.price) return modalMessageError('Нет цены.', 'Введите цену услуги.');
        if(!data?.time) return modalMessageError('Нет длительности.', 'Введите длительность услуги.');
        if(!selectedImage) return modalMessageError('Нет изображения.', 'Выберите фотографию для услуги.');
        
        const formData = new FormData();
        formData.append('foo', {
            uri: selectedImage.uri,
            type: selectedImage.mimeType,
            name: selectedImage.fileName
        } as any);
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('price', String(data.price) );
        formData.append('time', String(data.time) );
        if(data.id_department) formData.append('id_department', String(data.id_department) );
        await httpServiceService.POST_createService(formData);
    }catch(err) {
        console.log(err);
    }
}