import { RegisterFormCreateInterface } from ".";

export interface UserDataResponseInterface {
    id: string;
    completeName: string;
    doi: string;
    email: string;
    phone?: string;
    address?: string;
    amount?: number ;
    onAccount?: number;
    pendingAmount?: number;
}

export interface UserAuthResponseInterface {
    token: string;
    userData: UserDataResponseInterface;
}

interface OauthInterface {
    isGoogle: boolean,
    isMs: boolean, 
    oauthId: string,
}

export interface UserFomLoginInterface {
    email: string;
    password: string;
    oauth?: OauthInterface;
    registerData?: RegisterFormCreateInterface;
}

export const LoginFormValues: UserFomLoginInterface = {
    email: '',
    password: ''
};

export interface GoogleLoginInterface {
    clientId: string
    iss: string
    azp: string
    aud: string
    sub: string
    email: string
    email_verified: boolean
    nbf: number
    name: string
    picture: string
    given_name: string
    family_name: string
    iat: number
    exp: number
    jti: string
}
