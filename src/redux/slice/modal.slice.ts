import { createSlice } from '@reduxjs/toolkit';
import type { TMessage } from '@/components/shared/ModalMsg/ModalMsg';
import type { PayloadAction } from '@reduxjs/toolkit';


interface IModalObject {
    /**
     * `Переменная видимости модального окна, показать или нет.`
     */
    modalVisible: boolean;
    /**
     * `Заголовок в модальном окне.`
     */
    message: string;
    /**
     * `Описание в модальном окне.`
     */
    discription: string;
    /**
     * `Стиль модального окна.`
     */
    modalType: TMessage;
}

interface ISpiner {
    isShowSpinner: boolean;
}

interface IModalSlice {
    modal: IModalObject;
    spiner: ISpiner;
}

const initialState: IModalSlice = {
    modal: {
        modalVisible: false,
        message: '',
        discription: '',
        modalType: null
    },
    spiner: {
        isShowSpinner: false
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
        setAppModalObject: (state, action: PayloadAction<IModalObject | 'close'>) => {
            if(action.payload === 'close') {
                state.modal = {modalVisible: false, message: '', discription: '', modalType: null};
            } else {
                state.modal = action.payload;
            }
        },
        setAppIsShowSpinner: (state, action: PayloadAction<ISpiner>) => {
            state.spiner = action.payload;
        }
    }
});


export default modalSlice.reducer;

export const {
    setAppModalObject,
    setAppIsShowSpinner
} = modalSlice.actions;