import * as ImagePicker from 'expo-image-picker';
import httpMasterService from '@/api/routes/master/service/http.master.service';
import * as FileSystem from 'expo-file-system';


import type { ExpoRouter } from 'expo-router/types/expo-router';
import type { TFormMaster } from '@/app/admin/adminMaster';
import { baseLink } from '@/api/axios/axios.instance/instance';


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

        //* Выбрано ли новое изображение.
        if(selectedImage && (await FileSystem.getInfoAsync(selectedImage.uri)).exists) {
            
            formData.append('foo', {
                uri: selectedImage.uri,
                type: "image/jpeg", //selectedImage.mimeType,
                name: "387536e7-e93f-4d90-a63a-b5488d185fab.jpeg" //selectedImage.fileName || sliceWithFileName || 'image.jpeg'
            } as any);
        }

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

        const result = await httpMasterService.PATCH_editMaster(formData);
        if(result) isMessage(result);
        router.back();
    } catch(err) {
        console.error(err);
    }
}


