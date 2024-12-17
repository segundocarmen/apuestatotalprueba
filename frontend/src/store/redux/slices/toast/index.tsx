import { createSlice } from '@reduxjs/toolkit';
import { ToastDefault } from './initialValues';

export const userSlice = createSlice({
    name: 'toast',
    initialState: ToastDefault,
    reducers: {
        clearToastData: state => {
            state.toastData = ToastDefault.toastData;
            state.show = false;
        },
        setToastData: (state, action) => {
            const data = action.payload;
            state.toastData = data;
            state.show = !state.show;
        }
    }
});

export const { setToastData, clearToastData } = userSlice.actions;

export default userSlice.reducer;
