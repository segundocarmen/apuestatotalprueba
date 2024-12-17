/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetCookie, ReadCookie, RemoveCookie } from './CookieServer';

export const SaveCookie = async (data: any, appCookie: string) => {
    await SetCookie(data, appCookie);
};

export const GetCookie = (appCookie: string) => {
    return ReadCookie(appCookie);
};

export const DeleteCookie = async (appCookie: string) => {
    await RemoveCookie(appCookie);
};
