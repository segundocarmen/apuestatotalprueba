import { createSlice } from '@reduxjs/toolkit';
import { ApplicationDefault } from './initialvalues';

export const applicationSlice = createSlice({
    name: 'application',
    initialState: ApplicationDefault,
    reducers: {
        setApplicationConnection: (state, action) => {
            const data = action.payload;
            state.connection = data;
        }
    }
});

export const {
    setApplicationConnection,
} = applicationSlice.actions;

export default applicationSlice.reducer;