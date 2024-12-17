import { GetStorage } from '@/common/storage';
import { UserStoreInterface } from './user.interface';
const UserData = GetStorage(process.env.NEXT_PUBLIC_USER_DATA_COOKIE);
const UserDataClient = GetStorage(process.env.NEXT_PUBLIC_CLIENTUSER_DATA_COOKIE);

const initialUserData = {
    email: '',
    id: '',
    name: '',
    completeName: ''
};

export const UserDefault: UserStoreInterface = {
    userData: UserData ? UserData : UserDataClient ? UserDataClient : initialUserData,
    isLoged: false,
};