import { RegistrationDTO } from "@/api/routes/registration/types/registration.types";
import { ServiceDTOAndDepartmentName } from "../../service/types/service.types";

//: MasterDTO                                                    
/** 
 * @table master
 * @param id Id записи.@param id Id записи.
 * @param name - Имя мастера.
 * @param phone - Телефон мастера.
 * @param picture - Аватар мастера.
 * @param access_ban - Переменная для блокировки мастера (0 - не заблокирован, 1 - заблокирован).
 * @param id_registration Внешний ключ на запись в таблице registration.
 */
export interface MasterDTO {
    id: number;
    name: string;
    surname: string;
    description: string;
    phone: string;
    picture: string;
    access_ban: number;
    id_registration: number;
    id_department: number | null;
}

//: Types                                                        
export interface IAddMaster extends 
    Omit<MasterDTO, 'id' | 'picture' | 'access_ban' | 'id_registration'>, 
    Pick<RegistrationDTO, 'email' | 'password'> 
{}

/**
 * `Интерфейс для редактирования мастера.`
 * @param email Email мастера.
 * @param oldImgName Имя старого изображения для удаления.
 * @param password Password мастера.
 */
export interface IReqEditMaster extends 
    Omit<MasterDTO,  'id_registration'> 
{
    email: string;
    password?: string;
}

export interface IEditMaster extends Omit<MasterDTO, 'id_registration' | 'id'> {};

/**
 * `Результат поиска строки в таблице Master.`
 * @param department_name Имя группы.
 * @param average_stars Средняя оценка поставленая мастеру.
 */
export interface IMasterFind extends MasterDTO, Pick<RegistrationDTO, 'email'> {
    department_name: string | null;
    average_stars: string | null;
};

/**
 * `Все сервисы мастера.`
 * @param department_name Имя группы к которой относится сервис.
 * @param id_master ID мастера кому добавлены данные сервисы.
 */
export interface IGetServiceOfMaster extends ServiceDTOAndDepartmentName {
    id_master: number;
}

