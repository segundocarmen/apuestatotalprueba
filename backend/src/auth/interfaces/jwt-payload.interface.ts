export interface JwtPayloadInterface {
    id: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    state: number;
    isOauth: boolean;
    isGoogle: boolean;
    isMs: boolean;
    oauthId: string;
    refreshToken: string;
}
