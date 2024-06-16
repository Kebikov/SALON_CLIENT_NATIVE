/** 
 * @table service
 * @param title Название услуги.
 * @param description Описание услуги.
 * @param price Цена услуги.
 * @param time Время выполнения услуги.
 * @param img Путь к изображению услуги.
 * @param id_department ? К кокой группе относится данная услуга.
 */
export interface IService {
    title: string;
    description: string;
    price: number;
    time: string;
    img: string;
    id_department?: number;
}