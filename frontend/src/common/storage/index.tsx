/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

export const SaveStorage = (data: any, name: string | undefined) => {
    if (typeof localStorage === 'undefined') {
        return '';
    }
    if (name) {
        localStorage.setItem(name, JSON.stringify(data));
    }
};

export const GetStorage = (name: string | undefined) => {
    if (typeof localStorage === 'undefined') {
        return '';
    }
    if (name) {
        const data: any = localStorage.getItem(name);
        return JSON.parse(data);
    }
};

export const DeleteStorage = (name: string | undefined) => {
    if (name) {
        localStorage.removeItem(name);
    }
};

export const DeleteAllStorage = () => {
    localStorage.clear();
};

export const GetSessionUserid = () => {
    const userData = GetStorage(process.env.NEXT_PUBLIC_USER_DATA_COOKIE);
    const id = userData.id;
    return id;
};
