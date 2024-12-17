import { ApiRequest } from '@/interface';
import { GetAuthCookie } from '@/common/utils/AuthServer';

interface PropsRequestInterface<T> {
    path: string;
    method: string;
    data?: T;
}

// Create a function FetchDAata with the following generic type: T
export const FetchData = async <T, S>({
    path,
    method,
    data
}: PropsRequestInterface<T>): Promise<S> => {
    const { value } = await GetAuthCookie();
    const response: S = await api({
        method,
        path,
        token: value || '',
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
    return res?.json();
};
