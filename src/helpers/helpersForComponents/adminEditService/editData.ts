import * as ImagePicker from 'expo-image-picker';
import httpServiceService from '@/api/routes/service/service/http.service.service';
import type { ExpoRouter } from 'expo-router/types/expo-router';
import type { ServiceDTOforEdit } from '@/api/routes/service/types/service.types';


interface IeditData {
    selectedImage: ImagePicker.ImagePickerAsset | null;
    data: ServiceDTOforEdit;
    modalMessageError: (title: string, discription: string) => void;
    isMessage: (data: unknown) => void;
    router: ExpoRouter.Router
}

    
/**
 * `Редактирование данных на сервере.`
 */
export const editData = async ({
    selectedImage, 
    data, 
    modalMessageError, 
    isMessage, 
    router
}: IeditData) => {

    try{
        if(!data?.id) return modalMessageError('Ошибка id.', 'Не переданно id услуги.');
        if(!data?.title) return modalMessageError('Нет названия.', 'Введите название услуги.');
        if(!data?.description) return modalMessageError('Нет описания.', 'Введите описание услуги.');
        if(!data?.price) return modalMessageError('Нет цены.', 'Введите цену услуги.');
        if(!data?.time) return modalMessageError('Нет длительности.', 'Введите длительность услуги.');

        const formData = new FormData();
        // Выбрано ли новое изображение.
        if(selectedImage) {
            const sliceWithFileName = selectedImage.uri.split('/').at(-1);
            formData.append('foo', {
                uri: selectedImage.uri,
                type: selectedImage.mimeType,
                name: selectedImage.fileName || sliceWithFileName || 'image.jpg'
            } as any);
            formData.append('oldImgName', String(data.img) );
        }
        // Выбрана ли группа.
        if(data.id_department) formData.append('id_department', String(data.id_department) );
        
        formData.append('id', String(data.id));
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('img', data.img);
        formData.append('price', String(data.price));
        formData.append('time', String(data.time));
        
        const result = await httpServiceService.PATCH_editService(formData);
        if(result) isMessage(result);
        router.back();
    } catch(err) {
        console.error(err);
    }
}