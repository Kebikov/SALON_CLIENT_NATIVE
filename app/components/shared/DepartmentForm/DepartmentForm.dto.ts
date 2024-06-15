import type { IDataDepartment } from '@/pages/AdminAddDepartment/AdminAddGroupDepartment';

export interface IDepartmentForm {
    handlePressButton: (data: IDataDepartment) => void;
    titleForButton?: string;
    initialData?: IDataDepartment;
}