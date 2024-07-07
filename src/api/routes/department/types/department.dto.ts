/** 
 * @table `Department - Таблица с группами.`
 * @param name Имя группы.
 * @param discription Описание группы.
 * @param icon Иконка группы, например: "16.png"
 */
export interface IDataDepartment {
    name: string;
    discription: string;
    icon: string;
}

/**
 * @param name Имя группы.
 * @param discription Описание группы.
 * @param icon Иконка группы, например: "16.png"
 * @param id ID группы.
 */
export interface IDataDepartmentAndId extends IDataDepartment {
    id: number;
}