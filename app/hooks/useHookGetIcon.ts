import { useState, useEffect } from 'react';
import httpImgService from '@/api/routes/img/service/http.img.service';

/**
 * `Hook получения изображений иконок.`
 * @param arrImg Массив изображений.
 * @example const { arrImg } = useHookGetIcon();
 */
export const useHookGetIcon = () => {
    /**
     * @param arrImg Массив изображений.
     */
    const [arrImg, setArrImg] = useState<string[]>([]);

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
        arrImg
    }
}