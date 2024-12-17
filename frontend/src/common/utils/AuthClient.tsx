/* eslint-disable @typescript-eslint/no-explicit-any */
import { Constants } from '../Constants';
import { DeleteCookie, SaveCookie, GetCookie } from '../cookie/index.client';
import { DeleteAllStorage } from '../storage';

export const appCookie =
    process.env.NEXT_PUBLIC_ACCESSTOKENKEY || 'redgalaraccessToken';
export const appClientCookie =
    process.env.NEXT_PUBLIC_ACCESSCLIENTTOKENKEY || 'redgalaraccessclientToken';

export const SetAuthCookie = async (data: any, cookieName = appCookie) => {
    await SaveCookie(data, cookieName);
};

export const GetAuthCookie = (cookieName = appCookie) => {
    return GetCookie(cookieName);
};

export const Logout = async () => {
    await DeleteCookie(appCookie);
    await DeleteCookie(appClientCookie);
    await DeleteAllStorage();
    window.location.href = Constants.loginUrl;
};
