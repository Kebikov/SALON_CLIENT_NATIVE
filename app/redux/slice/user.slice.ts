import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IgetInfoBasic } from '@/api/routes/client/types/client.types';


interface IUserSlice {
    user: IgetInfoBasic;
}


const initialState: IUserSlice = {
    user: {
        id: 0,
        email: 'email@gmail.com',
        role: 'client',
        name: 'клиент',
        picture: null,
        phone: null,
        isActivated: 0
    }
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAppUserInfo: (state, action: PayloadAction<IgetInfoBasic>) => {
            state.user = action.payload;
        }
    }
});


export default userSlice.reducer;

export const {
    setAppUserInfo
} = userSlice.actions;