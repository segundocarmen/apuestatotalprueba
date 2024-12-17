import axios, { AxiosResponse } from 'axios';
import { ApiRequest } from '@/interface';
import { GetAuthCookie } from '@/common/utils/AuthServer';

interface PropsInterface {
    path: string;
    method: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    data?: Object;
}

export const FetchData = async ({ path, method, data }: PropsInterface) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { value }: any = await GetAuthCookie();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: AxiosResponse<any> = await api({
        method,
        path,
        token: value,
        data
    });
    return response.data;
};

const api = async ({
    method = '',
    path = '',
    token = '',
    data
}: ApiRequest) => {
    return await axios.request({
        method,
        baseURL: `${path}`,
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data
    });
};
