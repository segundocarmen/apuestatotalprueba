/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers';

export const SetCookie = (data: any, name: string) => {
    cookies().set(name, data);
};

export const ReadCookie = (name: string) => {
    try {
        const cookieStore = cookies();
        const data = cookieStore.get(name);
        return {
            ...data,
            value: data?.value || null
        };
    } catch (error) {
        return {
            value: null
        };
    }
};

export const RemoveCookie = async (name: string | any) => {
    cookies().delete(name);
};
