export interface UserInterface {
    id: string;
    completeName: string;
    email: string;
    phone: string;
    doi: string;
    address: string;
    activationToken: string;
    resetPasswordToken: string;
    refreshToken: string;
    isOauth: boolean;
    isGoogle: boolean;
    isMs: boolean;
    oauthId: string;
    state: number;
    createdAt: string;
    updatedAt: string;
}


export interface UserFormCreateInterface {
    completeName: string;
    email: string;
    password: string;
    phone: string;
    doi: string;
    address: string;
}

export const UserFormValues: UserFormCreateInterface = {
    completeName: '',
    email: '',
    password: '',
    doi: '',
    phone: '',
    address: ''
};
