/** 
 * @table service
 * @param id Id записи.
 * @param title Название услуги.
 * @param description Описание услуги.
 * @param price Цена услуги.
 * @param time Время выполнения услуги.
 * @param img Путь к изображению услуги.
 * @param id_department ? К кокой группе относится данная услуга.
 */
export interface ServiceDTO {
    id: number;
    title: string;
    description: string;
    price: number;
    time: number;
    img: string;
    id_department?: number;
}

export interface ServiceDTOAndDepartmentName extends ServiceDTO {
    name?: string;
}
