import { useState, useEffect } from 'react';
import httpImgService from '@/api/routes/img/service/http.img.service';

/**
 * `Hook получения изображений иконок.`
 * @example const { arrImg } = useHookGetIcon();
 * @returns `Object :`
 * @param arrImg Массив изображений.
 * @param active Выбранное изображение.
 * @param setActive useState для передачи выбранного изображения.
 */
export const useHookGetIcon = () => {
    /**
     * @param arrImg Массив изображений.
     */
    const [arrImg, setArrImg] = useState<string[]>([]);
        /**
     * @param active Выбраное изображение.
     */
    const [active, setActive] = useState<string>('');

    useEffect(() => {
        httpImgService.GET_files('icon-group')
            .then(result => {
                if(result && result.length > 0) {
                    setArrImg(result);
                }
            })
            .catch(err => console.error(err));
    },[]);

    return {
        arrImg,
        active,
        setActive
    }
}