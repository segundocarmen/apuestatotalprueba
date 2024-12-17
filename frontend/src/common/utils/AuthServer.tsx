/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteCookie, SaveCookie, GetCookie } from '../cookie/index.server';

export const appCookie =
    process.env.NEXT_PUBLIC_ACCESSTOKENKEY || 'accessToken';

export const SetAuthCookie = async (data: any) => {
    await SaveCookie(data, appCookie);
};

export const GetAuthCookie = () => {
    return GetCookie(appCookie);
};

export const Logout = async () => {
    await DeleteCookie(appCookie);
};
