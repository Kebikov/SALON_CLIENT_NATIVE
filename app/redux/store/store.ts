import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "../slice/modal.slice";
import userSlice from "../slice/user.slice";


const store = configureStore({
    reducer: {modalSlice, userSlice},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;

