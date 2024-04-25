import { createSlice } from '@reduxjs/toolkit';
import type { TMessage } from '@/shared/ModalMsg/ModalMsg';
import type { PayloadAction } from '@reduxjs/toolkit';


interface IModalObject {
    /**
     * Переменная видимости модального окна, показать или нет.
     */
    modalVisible: boolean;
    /**
     * Текст в модальном окне.
     */
    message?: string;
    /**
     * Стиль модального окна.
     */
    modalType?: TMessage;
}


interface IModalSlice {
    modal: IModalObject;
}

const  initialState: IModalSlice = {
    modal: {
        modalVisible: false,
        message: '',
        modalType: 'message'
    }
}


const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        /**
         * Установка состояния модального окна.
         * @param state 
         * @param action 
         */
        setAppModalObject: (state, action: PayloadAction<IModalObject>) => {
            state.modal = action.payload;
        }
    }
});


export default modalSlice.reducer;

export const {
    setAppModalObject
} = modalSlice.actions;