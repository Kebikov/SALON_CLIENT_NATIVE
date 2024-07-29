import * as ImagePicker from 'expo-image-picker';
import httpMasterService from '@/api/routes/master/service/http.master.service';
import * as FileSystem from 'expo-file-system';

import type { ExpoRouter } from 'expo-router/types/expo-router';
import type { ServiceDTO } from '@/api/routes/service/types/service.types';
import type { TFormMaster } from '@/app/admin/adminMaster';


interface IEditMaster {
    selectedImage: ImagePicker.ImagePickerAsset | null;
    isAccessBan: boolean | undefined;
    data: TFormMaster | null;
    modalMessageError: (title: string, discription: string) => void;
    isMessage: (data: unknown) => void;
    router: ExpoRouter.Router;
}

    
/**
 * `Редактирование данных на сервере.`
 * @param selectedImage Выбраное изображение.
 * @param data Данные мастера.
 * @param modalMessageError Функция вывода ошибки.
 * @param isMessage Функция вывода сообщения.
 * @param router Функция роутера.
 * @param isAccessBan Заблокирован ли пользователь.
 */
export const editMaster = async ({
    selectedImage,
    data, 
    modalMessageError, 
    isMessage, 
    router,
    isAccessBan
}: IEditMaster) => {
    console.log('-------------------------------------------------------------------------');
    try{

        if(!data?.id) return modalMessageError('Ошибка id.', 'Не переданно id мастера.');
        if(!data?.name) return modalMessageError('Нет имени.', 'Введите имя мастера.');
        if(!data?.surname) return modalMessageError('Нет фамилии.', 'Введите фамилию мастера.');
        if(!data?.description) return modalMessageError('Нет описания.', 'Введите описание мастера.');
        if(!data?.phone) return modalMessageError('Нет телефона.', 'Введите номер телефона мастера.');
        if(isAccessBan === undefined) return modalMessageError('Не назначен доступ.', 'Не передан доступ мастера.');
        if(!data?.email) return modalMessageError('Нет Email.', 'Введите Email мастера.');
        if(!data?.picture) return modalMessageError('Нет изображения.', 'Выберите аватарку для мастера.');

        //* Добавление данных.
        const formData = new FormData();
        formData.append('id', String(data.id));
        formData.append('name', data.name);
        formData.append('surname', data.surname);
        formData.append('description', data.description);
        formData.append('phone', String(data.phone));
        formData.append('access_ban', data.access_ban ? '0' : '1');
        formData.append('email', data.email);
        formData.append('picture', data.picture);

        //* Выбран ли пароль
        if(data.password) formData.append('password', data.password);
        //* Выбрана ли группа.
        if(data.id_department) formData.append('id_department', String(data.id_department) );

        //* Выбрано ли новое изображение.
        if(selectedImage && (await FileSystem.getInfoAsync(selectedImage.uri)).exists) {
            const sliceWithFileName = selectedImage.uri.split('/').at(-1);
            console.log('selectedImage.uri >>> ', selectedImage.uri);
            console.log('selectedImage.mimeType >>> ', selectedImage.mimeType);
            console.log('selectedImage.fileName >>> ', selectedImage.fileName);
            console.log('sliceWithFileName >>> ', sliceWithFileName);
            formData.append('foo', {
                uri: selectedImage.uri,
                type: selectedImage.mimeType,
                name: selectedImage.fileName || sliceWithFileName || 'image.jpeg'
            } as any);
        }

        const result = await httpMasterService.PATCH_editMaster(formData);
        if(result) isMessage(result);
        router.back();
    } catch(err) {
        console.error(err);
    }
}