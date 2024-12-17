/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetCookie, ReadCookie, RemoveCookie } from './CookieClient';

export const SaveCookie = async (
    data: object | string | number,
    appCookie: string
) => {
    await SetCookie(data, appCookie);
};

export const GetCookie = (appCookie: string) => {
    return ReadCookie(appCookie);
};

export const DeleteCookie = async (appCookie: string) => {
    await RemoveCookie(appCookie);
};
