import { createSlice } from '@reduxjs/toolkit';
import { UserDefault } from './initialValues';

export const userSlice = createSlice({
    name: 'users',
    initialState: UserDefault,
    reducers: {
        setUserData: (state, action) => {
            const data = action.payload;
            state.userData = data;
        },
        setIsLoged: (state, action) => {
            const data = action.payload;
            state.isLoged = data;
        },
    }
});

export const {
    setUserData,
    setIsLoged,
} = userSlice.actions;

export default userSlice.reducer;
