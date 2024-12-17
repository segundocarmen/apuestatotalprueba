import { configureStore } from '@reduxjs/toolkit';
import users from './slices/users';
import toast from './slices/toast';
import application from './slices/application';

export const store = configureStore({
    reducer: {
        application,
        users,
        toast,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
