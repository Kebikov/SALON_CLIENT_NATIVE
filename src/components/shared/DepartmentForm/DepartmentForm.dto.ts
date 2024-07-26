import type { DepartmentDTO } from "@/api/routes/department/types/department.types";

export interface IDepartmentForm {
    handlePressButton: (data: Omit<DepartmentDTO, 'id'>) => void;
    titleForButton?: string;
    initialData?: Omit<DepartmentDTO, 'id'>;
}