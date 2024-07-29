import * as ImagePicker from 'expo-image-picker';
import httpMasterService from '@/api/routes/master/service/http.master.service';

import type { ExpoRouter } from 'expo-router/types/expo-router';
import type { TFormMaster } from '@/app/admin/adminMaster';



interface IaddMasterForm {
    selectedImage: ImagePicker.ImagePickerAsset | null;
    data: TFormMaster | null;
    modalMessageError: (title: string, discription: string) => void;
    isMessage: (data: unknown) => void;
    router: ExpoRouter.Router
}


export const addMaster = async ({
    selectedImage,
    data,
    modalMessageError,
    isMessage,
    router
}: IaddMasterForm) => {
    console.log('**********************************************');
    try{
        if(!data?.name) return modalMessageError('Нет имени.', 'Введите имя мастера.');
        if(!data?.surname) return modalMessageError('Нет фамилии.', 'Введите фамилию мастера.');
        if(!data?.description) return modalMessageError('Нет описания.', 'Введите описание мастера.');
        if(!data?.phone) return modalMessageError('Нет телефона.', 'Введите номер телефона мастера.');
        if(!data?.email) return modalMessageError('Нет Email.', 'Введите Email мастера.');
        if(!data?.password) return modalMessageError('Нет Password.', 'Введите пароль для входа мастера.');
        if(!selectedImage) return modalMessageError('Нет изображения.', 'Выберите фотографию мастера.');

        const sliceWithFileName = selectedImage.uri.split('/').at(-1);

        const formData = new FormData();
        console.log(sliceWithFileName);
        console.log(selectedImage.uri);
        console.log(selectedImage.mimeType);
        console.log(selectedImage.fileName || sliceWithFileName || 'image.jpg');
        formData.append('foo', {
            uri: selectedImage.uri,
            type: selectedImage.mimeType,
            name: selectedImage.fileName || sliceWithFileName || 'image.jpg'
        } as any);
        formData.append('name', data.name);
        formData.append('surname', data.surname);
        formData.append('description', data.description);
        formData.append('phone', data.phone);
        formData.append('email', data.email);
        formData.append('password', data.password);

        if(data.id_department) formData.append('id_department', String(data.id_department) );

        const result = await httpMasterService.POST_addMaster(formData);
        
        if(result) isMessage(result);
        router.back();
    } catch(err) {
        console.error(err);
    }
}