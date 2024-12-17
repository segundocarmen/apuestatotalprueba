/* eslint-disable @typescript-eslint/no-explicit-any */
import cookie from 'react-cookies';
import moment from 'moment';

const expires = moment().add(1, 'd').toDate();

export const SetCookie = (data: any, name: string, remember = false) => {
    const timeout: any = remember ? moment().add(1, 'y').toDate() : expires;
    cookie.save(name, data, { path: '/', maxAge: timeout });
};

export const ReadCookie = (name: string) => {
    if (cookie.load(name) !== undefined) {
        const data = cookie.load(name);
        return data;
    } else {
        return false;
    }
};

export const RemoveCookie = async (name: string) => {
    await cookie.remove(name);
};
