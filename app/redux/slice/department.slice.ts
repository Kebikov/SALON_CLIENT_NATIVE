import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IDepartmentSliceDepartment {
    icon: string;
};

interface IDepartmentSliceInitialState {
    department: IDepartmentSliceDepartment;
};

const initialState: IDepartmentSliceInitialState = {
    department: {
        icon: ''
    }
};


const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
        /**
         * Установка данных выбора группы.
         * @param state 
         * @param action 
         */
        setAppDepartment: (state, action: PayloadAction<IDepartmentSliceDepartment | 'clean'>) => {
            if(action.payload === 'clean') {
                state.department = {icon: ''};
            } else {
                state.department = action.payload;
            }
        }
    }
});


export default departmentSlice.reducer;

export const {
    setAppDepartment
} = departmentSlice.actions;