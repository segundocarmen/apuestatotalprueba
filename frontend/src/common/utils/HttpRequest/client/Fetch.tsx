/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiRequest } from '@/interface';
import { GetAuthCookie } from '@/common/utils/AuthClient';
interface PropsInterface {
    path: string;
    method: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    data?: Object;
}

export const FetchData = async ({ path, method, data }: PropsInterface) => {
    const value: any = await GetAuthCookie();
    const response: any = await api({
        method,
        path,
        token: value,
        data
    });
    return response;
};

const api = async ({
    method = '',
    path = '',
    token = '',
    data
}: ApiRequest) => {
    try {
        const params = data;
        const options = {
            method: method,
            body: JSON.stringify(params),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };
        const res = await fetch(path, options);
        return res.json();
    } catch (error) {
        console.log(error);
    }
};
