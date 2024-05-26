import type { IDataDepartment } from '@/pages/AdminAddGroupDepartment/AdminAddGroupDepartment';

export interface IDepartmentForm {
    handlePressButton: (data: IDataDepartment) => void;
    titleForButton?: string;
    initialData?: IDataDepartment;
}